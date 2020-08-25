#!/usr/bin/python3
# Created by Marijn Koolen (marijnkoolen)

import json
import os
from typing import Dict, List, Union
from flask import Flask, Response, request, abort, jsonify
from flask_cors import CORS
from indexer import Indexer
from settings import config, versions

app = Flask(__name__, static_url_path='', static_folder='public')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
app.add_url_rule('/lees-impact-vragenlijst-nl-2019/', 'reading-impact-questionnaire-nl-2019',
                 lambda: app.send_static_file('questionnaire-nl-2019/index.html'))
app.add_url_rule('/reading-impact-questionnaire-en-2020/', 'reading-impact-questionnaire-en-2020',
                 lambda: app.send_static_file('questionnaire-en-2020/index.html'))

cors = CORS(app)
es_indexer = Indexer(config)


def read_boilerplate(version: str) -> Dict[str, str]:
    with open(versions[version]['boilerplate_file'], 'rt') as fh:
        return json.load(fh)


def read_questions(version: str) -> Dict[str, str]:
    with open(versions[version]['questions_file'], 'rt') as fh:
        return json.load(fh)


def make_response(response_data: Union[List[Dict[str, any]], Dict[str, any]]):
    return Response(
        json.dumps(response_data),
        mimetype='application/json',
        headers={
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        }
    )


@app.route('/api/reading_impact/<version>/save_response', methods=["POST"])
def save_response(version: str):
    response = request.get_json()
    print(response)
    index = config["es_index"][version]
    es_indexer.add_response(response, index)
    return make_response({"status": "saved_response", "sentence_id": response["sentence_id"]})


@app.route('/api/reading_impact/<version>/remove_response', methods=["POST"])
def remove_response(version: str):
    response = request.get_json()
    index = config["es_index"][version]
    es_indexer.remove_response(response, index)
    return make_response({"status": "removed_response", "sentence_id": response["sentence_id"]})


@app.route('/api/reading_impact/<version>/load_progress', methods=["GET"])
def load_progress(version: str):
    annotator = request.args.get('annotator')
    index = config["es_index"][version]
    progress = es_indexer.get_progress(annotator, index)
    print(progress)
    return make_response(progress)


@app.route('/api/reading_impact/register_annotator', methods=["GET"])
def register_annotator():
    annotator = request.args.get('annotator')
    response = es_indexer.register_annotator(annotator)
    return make_response(response)


@app.route('/api/reading_impact/annotator_exists', methods=["GET"])
def annotator_exists():
    annotator = request.args.get('annotator')
    response = {"annotator": annotator, "exists": es_indexer.annotator_exists(annotator)}
    return make_response(response)


@app.route('/api/reading_impact/<version>/load_annotator_sentences', methods=["GET"])
def load_annotator_sentences(version: str):
    annotator = request.args.get('annotator')
    index = config["es_index"][version]
    sentences = es_indexer.get_annotator_sentences(annotator, index)
    print('sentences:', len(sentences))
    return make_response(sentences)


@app.route('/api/reading_impact/<version>/load_sentences', methods=["GET"])
def load_sentences(version: str):
    annotator = request.args.get('annotator')
    index = config["es_index"][version]
    sentences = es_indexer.get_unfinished_sentences(annotator, index)
    print('sentences:', len(sentences))
    return make_response(sentences)


@app.route('/api/reading_impact/save_comment', methods=["POST"])
def save_comment():
    comment = request.get_json()
    es_indexer.add_comment(comment)
    return make_response({"status": "saved_comment"})


@app.route('/api/reading_impact/<version>/boilerplate', methods=['GET'])
def get_boilerplate(version):
    if version not in versions:
        abort(jsonify(message="unknown version"), 404)
    boilerplate = read_boilerplate(version)
    print(boilerplate)
    return make_response(boilerplate)


if __name__ == '__main__':
    app.run(host=config["api_host"], port=int(os.environ.get("PORT", config["api_port"])), debug=True)

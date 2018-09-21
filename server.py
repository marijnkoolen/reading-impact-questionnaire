# Created by Marijn Koolen (marijnkoolen)

import json
import os
import time
import requests
import xmltodict
import re
from flask import Flask, Response, request
from flask.ext.cors import CORS
from indexer import Indexer
from settings import config

app = Flask(__name__, static_url_path='', static_folder='public')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))

cors = CORS(app)
es_indexer = Indexer(config)

def make_response(response_data):
    return Response(
        json.dumps(response_data),
        mimetype='application/json',
        headers={
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        }
    )

@app.route('/api/reading_impact/save_response', methods=["POST"])
def save_response():
    response = request.get_json()
    es_indexer.add_response(response)
    return make_response({"status": "saved_response", "sentence_id": response["sentence_id"]})

@app.route('/api/reading_impact/remove_response', methods=["POST"])
def remove_response():
    response = request.get_json()
    es_indexer.remove_response(response)
    return make_response({"status": "removed_response", "sentence_id": response["sentence_id"]})

@app.route('/api/reading_impact/load_progress', methods=["GET"])
def load_progress():
    annotator = request.args.get('annotator')
    progress = es_indexer.get_progress(annotator)
    print(progress)
    return make_response(progress)

@app.route('/api/reading_impact/load_sentences', methods=["GET"])
def load_sentences():
    annotator = request.args.get('annotator')
    sentences = es_indexer.get_unfinished_sentences(annotator)
    return make_response(sentences)

if __name__ == '__main__':
    app.run(host=config["api_host"], port=int(os.environ.get("PORT", config["api_port"])), debug=True)

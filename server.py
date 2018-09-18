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

app = Flask(__name__, static_url_path='', static_folder='public')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))

cors = CORS(app)
es_indexer = Indexer()

def make_response(response_data):
    return Response(
        json.dumps(response_data),
        mimetype='application/json',
        headers={
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        }
    )

def request_es(request_url, data):
    response = requests.post(request_url, json=data)
    return response.text

@app.route('/api/reading_impact/save_response', methods=["POST"])
def save_response():
    response = request.get_json()
    es_indexer.add_response(response)
    return make_response({"status": "saved_response", "sentence_id": response["sentence_id"]})

@app.route('/api/reading_impact/load_progress', methods=["GET"])
def load_progress():
    annotator = request.args.get('annotator')
    progress = es_indexer.get_progress(annotator)
    return make_response(progress)

@app.route('/api/reading_impact/load_sentences', methods=["GET"])
def load_sentences():
    annotator = request.args.get('annotator')
    sentences = es_indexer.get_unfinished_sentences(annotator)
    return make_response(sentences)

def get_sentences(hit):
    doc_id = hit["_source"]["responseid"]
    for sentence_index, sentence in enumerate(hit["_source"]["sentences"]):
        sentence_id = "{d}-{s}".format(d=doc_id, s=sentence_index+1)
        yield {"sentence_id": sentence_id, "text": sentence}

if __name__ == '__main__':
    es_indexer.reset_response_index()
    response = es_indexer.es.search(index="odbr-reviews", doc_type="review", body={"size": 10})
    sentences = [sentence for hit in response['hits']['hits'] for sentence in get_sentences(hit)]
    print("Num sentences:", len(sentences))
    es_indexer.index_sentences(sentences)
    app.run(port=int(os.environ.get("PORT", 3001)), debug=True)

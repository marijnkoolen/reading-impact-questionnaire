from typing import Dict, List, Union
import datetime
import pytz
from elasticsearch import Elasticsearch


def check_response_exists(sentence: Dict[str, any], response: Dict[str, Union[str, int]]) -> bool:
    modified = False
    for annotation_index, annotation in enumerate(sentence["annotations"]):
        if annotation["annotator"] == response["annotator"]:
            sentence["annotations"].pop(annotation_index)
            response["created"] = annotation["created"]
            if "num_modifications" in annotation:
                response["num_modifications"] = annotation["num_modifications"]
            modified = True
    return modified


def make_timestamp() -> str:
    return datetime.datetime.now(pytz.utc).isoformat()


def add_timestamp(response: Dict[str, Union[str, int]], modified: bool) -> None:
    # Keep track of number of times a judgement is modified for analysis.
    # Many modifications suggests sentence is difficult.
    if modified:
        if "num_modifications" not in response:
            response["num_modifications"] = 0
        response["num_modifications"] += 1
        response["modified"] = make_timestamp()
    else:
        response["created"] = make_timestamp()


def remove_non_annotator_annotations(annotator: str, sentences: List[Dict[str, any]]) -> None:
    for sentence in sentences:
        sentence["annotations"] = [annotation for annotation in sentence["annotations"]
                                   if annotation["annotator"] == annotator]


class Indexer(object):

    def __init__(self, config: Dict[str, any]):
        self.es = Elasticsearch([config["es_host"]], port=config["es_port"])
        self.NUM_ANNOTATORS = config["num_annotators_per_sentence"]
        self.num_sentences_per_page = config["num_sentences_per_page"]

    def reset_response_index(self, index: str) -> None:
        if self.es.indices.exists(index=index):
            print("removing index", index)
            self.es.indices.delete(index=index)
        else:
            print('No index reset, unknown index')

    def index_sentences(self, sentences: List[dict], index: str) -> None:
        for sentence in sentences:
            sentence["annotation_status"] = "todo"
            sentence["annotations"] = []
            self.index_sentence(sentence, index)
        self.refresh(index)

    def index_sentence(self, sentence: Dict[str, any], index: str) -> None:
        self.es.index(index=index, doc_type="_doc", id=sentence["sentence_id"], body=sentence)

    def annotator_exists(self, annotator: str) -> bool:
        return self.es.exists(index="reading_impact_annotator", doc_type="annotator", id=annotator)

    def has_demographics(self, annotator: str) -> bool:
        if not self.annotator_exists(annotator):
            self.register_annotator(annotator)
        doc = self.es.get(index="reading_impact_annotator", doc_type="annotator", id=annotator)
        return 'demographics' in doc['_source']

    def register_annotator(self, annotator: str) -> Dict[str, Union[str, int]]:
        if self.annotator_exists(annotator):
            return {"status": 0, "message": "annotator already exists"}
        doc = {"annotator": annotator, "created": make_timestamp()}
        self.es.index(index="reading_impact_annotator", doc_type="annotator", id=annotator, body=doc)
        return {"status": 200, "message": "annotator registered"}

    def register_demographics(self, annotator: str,
                              demographics: Dict[str, Union[str, int]]) -> Dict[str, Union[str, int]]:
        if not self.annotator_exists(annotator):
            self.register_annotator(annotator)
        doc = self.es.get(index="reading_impact_annotator", doc_type="annotator", id=annotator)
        print('doc:', doc)
        doc['_source']['demographics'] = demographics
        self.es.index(index="reading_impact_annotator", doc_type="annotator", id=annotator, body=doc['_source'])
        return {"status": 200, "message": "demographics registered"}

    def get_annotator_sentences(self, annotator: str, index: str) -> List[Dict[str, any]]:
        query = {
            "query": {
                "match": {
                    "annotations.annotator": annotator
                }
            },
            "size": 10000
        }
        response = self.es.search(index=index, doc_type="_doc", body=query)
        if response['hits']['total'] == 0:
            return []
        else:
            sentences = [hit["_source"] for hit in response['hits']['hits']]
            remove_non_annotator_annotations(annotator, sentences)
            return sentences

    def get_unfinished_sentences(self, annotator: str, index: str) -> List[Dict[str, any]]:
        response = self.search_unfinished_sentences(annotator, index)
        if response['hits']['total'] == 0:
            return []
        else:
            sentences = [hit["_source"] for hit in response['hits']['hits']]
            remove_non_annotator_annotations(annotator, sentences)
            return sentences

    def search_unfinished_sentences(self, annotator: str, index: str) -> Dict[str, any]:
        query = {
            "query": {
                "bool": {
                    "should": [
                        {"match": {"annotation_status": "in_progress"}},
                        {"match": {"annotation_status": "todo"}}
                    ],
                    "must_not": {
                        "match": {"annotations.annotator": annotator}
                    }
                }
            },
            "size": self.num_sentences_per_page
        }
        return self.es.search(index=index, doc_type="_doc", body=query)

    def get_sentences_by_status(self, annotation_status: str, index: str) -> Dict[str, any]:
        query = {
            "query": {
                "match": {"annotation_status": annotation_status}
            },
            "size": 0
        }
        return self.es.search(index=index, doc_type="_doc", body=query)

    def get_sentences_by_annotator(self, annotator: str, index: str) -> Dict[str, any]:
        query = {
            "query": {
                "match": {"annotations.annotator": annotator}
            },
            "size": 0
        }
        return self.es.search(index=index, doc_type="_doc", body=query)

    def get_progress(self, annotator: str, index: str) -> Dict[str, int]:
        self.refresh(index)
        response_all = self.es.search(index=index, doc_type="_doc", body={"size": 0})
        response_done = self.get_sentences_by_status("done", index)
        response_in_progress = self.get_sentences_by_status("in_progress", index)
        response_done_by_you = self.get_sentences_by_annotator(annotator, index)
        return {
            "sentences_total": response_all['hits']['total'],
            "sentences_done": response_done['hits']['total'],
            "sentences_in_progress": response_in_progress['hits']['total'],
            "sentences_done_by_you": response_done_by_you['hits']['total'],
        }

    def get_sentence(self, sentence_id: str, index: str) -> Dict[str, any]:
        response = self.es.get(index=index, doc_type="_doc", id=sentence_id)
        return response["_source"]

    def add_comment(self, comment: Dict[str, any]) -> Dict[str, any]:
        response = self.es.index(index="annotator_comment", doc_type="_doc", body=comment)
        return response

    def add_response(self, response: Dict[str, any], index: str) -> None:
        sentence = self.get_sentence(response["sentence_id"], index)
        modified = check_response_exists(sentence, response)
        add_timestamp(response, modified)
        sentence["annotations"].append(response)
        if len(sentence["annotations"]) >= self.NUM_ANNOTATORS:
            sentence["annotation_status"] = "done"
        else:
            sentence["annotation_status"] = "in_progress"
        self.index_sentence(sentence, index)

    def remove_response(self, response: Dict[str, any], index: str) -> None:
        sentence = self.get_sentence(response["sentence_id"], index)
        for annotation_index, annotation in enumerate(sentence["annotations"]):
            if annotation["annotator"] == response["annotator"]:
                sentence["annotations"].pop(annotation_index)
        if len(sentence["annotations"]) == self.NUM_ANNOTATORS:
            sentence["annotation_status"] = "done"
        else:
            sentence["annotation_status"] = "in_progress"
        self.index_sentence(sentence, index)

    def refresh(self, index: str) -> None:
        self.es.indices.refresh(index=index)


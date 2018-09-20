from elasticsearch import Elasticsearch

class Indexer(object):

    def __init__(self, config):
        self.index = config["es_index"]
        self.doc_type = config["es_doc_type"]
        self.es = Elasticsearch([config["es_host"]], port=config["es_port"])
        self.NUM_ANNOTATORS = config["num_annotators"]
        self.num_sentences_per_page = config["num_sentences_per_page"]

    def reset_response_index(self):
        if self.es.indices.exists(index=self.index):
            print("removing index", self.index)
            self.es.indices.delete(index=self.index)

    def index_sentences(self, sentences):
        for sentence in sentences:
            sentence["annotation_status"] = "todo"
            sentence["annotations"] = []
            self.index_sentence(sentence)
        self.refresh()

    def index_sentence(self, sentence):
        self.es.index(index=self.index, doc_type=self.doc_type, id=sentence["sentence_id"], body=sentence)

    def get_unfinished_sentences(self, annotator):
        response = self.search_unfinished_sentences(annotator)
        if response['hits']['total'] == 0:
            return []
        else:
            return [hit["_source"] for hit in response['hits']['hits']]

    def search_unfinished_sentences(self, annotator):
        query = {
            "query": {
                "bool": {
                    "should": [
                        { "match": { "annotation_status": "in_progress" } },
                        { "match": { "annotation_status": "todo" } }
                    ],
                    "must_not": {
                        "match": {"annotations.annotator": annotator}
                    }
                }
            },
            "size": self.num_sentences_per_page
        }
        return self.es.search(index=self.index, doc_type=self.doc_type, body=query)

    def get_sentences_by_status(self, annotation_status):
        print(annotation_status)
        query = {
            "query": {
                "match": { "annotation_status": annotation_status }
            },
            "size": 0
        }
        return self.es.search(index=self.index, doc_type=self.doc_type, body=query)

    def get_sentences_by_annotator(self, annotator):
        print(annotator)
        query = {
            "query": {
                "match": { "annotations.annotator": annotator }
            },
            "size": 0
        }
        return self.es.search(index=self.index, doc_type=self.doc_type, body=query)

    def get_progress(self, annotator):
        response_all = self.es.search(index=self.index, doc_type=self.doc_type, body={"size":0})
        response_done = self.get_sentences_by_status("done")
        response_in_progress = self.get_sentences_by_status("in_progress")
        response_done_by_you = self.get_sentences_by_annotator(annotator)
        return {
            "sentences_total": response_all['hits']['total'],
            "sentences_done": response_done['hits']['total'],
            "sentences_in_progress": response_in_progress['hits']['total'],
            "sentences_done_by_you": response_done_by_you['hits']['total'],
        }

    def get_sentence(self, sentence_id):
        response = self.es.get(index=self.index, doc_type=self.doc_type, id=sentence_id)
        return response["_source"]

    def add_response(self, response):
        sentence = self.get_sentence(response["sentence_id"])
        for annotation_index, annotation in enumerate(sentence["annotations"]):
            if annotation["annotator"] == response["annotator"]:
                sentence["annotations"].pop(annotation_index)
        sentence["annotations"].append(response)
        if len(sentence["annotations"]) == self.NUM_ANNOTATORS:
            sentence["annotation_status"] = "done"
        else:
            sentence["annotation_status"] = "in_progress"
        self.index_sentence(sentence)

    def refresh(self):
        self.es.indices.refresh(index=self.index)


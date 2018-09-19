from elasticsearch import Elasticsearch

NUM_ANNOTATORS = 3

class Indexer(object):

    def __init__(self, index="reading_impact_questionnaire", doc_type="response"):
        self.index = index
        self.doc_type = doc_type
        self.es = Elasticsearch()

    def reset_response_index(self):
        if self.es.indices.exists(index=self.index):
            self.es.indices.delete(index=self.index)

    def index_sentences(self, sentences):
        for sentence in sentences:
            sentence["response_status"] = "todo"
            sentence["annotations"] = []
            self.index_sentence(sentence)
        self.refresh()

    def index_sentence(self, sentence):
        self.es.index(index=self.index, doc_type=self.doc_type, id=sentence["sentence_id"], body=sentence)

    def get_unfinished_sentences(self, annotator, size=10):
        response = self.search_unfinished_sentences(annotator, size)
        if response['hits']['total'] == 0:
            return []
        else:
            return [hit["_source"] for hit in response['hits']['hits']]

    def search_unfinished_sentences(self, annotator, size):
        query = {
            "query": {
                "bool": {
                    "should": [
                        { "match": { "response_status": "in_progress" } },
                        { "match": { "response_status": "todo" } }
                    ],
                    "must_not": {
                        "match": {"annotations.annotator": annotator}
                    }
                }
            },
            "size": size
        }
        return self.es.search(index=self.index, doc_type=self.doc_type, body=query)

    def get_sentences_by_status(self, response_status):
        print(response_status)
        query = {
            "query": {
                "match": { "response_status": response_status }
            }
        }
        return self.es.search(index=self.index, doc_type=self.doc_type, body=query)

    def get_progress(self, annotator):
        response_all = self.es.search(index=self.index, doc_type=self.doc_type, body={})
        response_done = self.get_sentences_by_status("done")
        return {
            "sentences_total": response_all['hits']['total'],
            "sentences_done": response_done['hits']['total']
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
        if len(sentence["annotations"]) == NUM_ANNOTATORS:
            sentence["response_status"] = "done"
        else:
            sentence["response_status"] = "in_progress"
        self.index_sentence(sentence)

    def refresh(self):
        self.es.indices.refresh(index=self.index)


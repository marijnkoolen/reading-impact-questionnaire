
"use strict"

import AppDispatcher from './AppDispatcher.js';
import SentenceAPI from './sentenceAPI.js';
import questions from './questions.js';

const FormActions = {

    progress : null,

    setSentenceServer(endpoint) {
        SentenceAPI.sentenceServer = endpoint;
    },

    setVersion(version) {
        SentenceAPI.version = version;
    },

    getAnnotator() {
        return SentenceAPI.annotator;
    },

    setAnnotator(annotator) {
        SentenceAPI.annotator = annotator;
        window.localStorage.setItem("annotator", annotator);
        FormActions.clearNonAnnotatorData(annotator);
        FormActions.loadSentences(annotator);
    },

    clearNonAnnotatorData(annotator) {
        FormActions.clearNonAnnotatorResponses(annotator);
        FormActions.clearNonAnnotatorSentences(annotator);
    },

    clearNonAnnotatorSentences(annotator) {
        var sentences = FormActions.getLocalSentences();
        if (sentences) {
            var mySentences = sentences.filter((sentence) => {
                var keep = false;
                sentence.annotations.forEach((annotation) => {
                    if (annotation.annotator === annotator) {
                        keep = true;
                    }
                });
                return keep;
            });
            if (mySentences.length === 0) {
                mySentences = null;
            }
            FormActions.setLocalSentences(mySentences);
        }
    },

    clearNonAnnotatorResponses(annotator) {
        var responses = FormActions.getLocalResponses();
        if (responses) {
            var myResponses = {};
            Object.keys(responses).forEach((sentenceId) => {
                if (responses[sentenceId].annotator === annotator) {
                    myResponses[sentenceId] = responses[sentenceId];
                }
            });
            if (Object.keys(myResponses).length === 0) {
                myResponses = null;
            }
            FormActions.setLocalResponses(myResponses);
        }
    },

    isDispatching() {
        return AppDispatcher.isDispatching();
    },

    changeView(view) {
        //FormActions.checkComment();
        AppDispatcher.dispatch({
            eventName: 'change-view',
            view: view
        })
    },

    generateID() {
        let genChar = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3);
        let genNum = Math.random().toString().replace("0.","").substr(0,3);
        return genChar + genNum;
    },

    addNewId(identifier) {
        var previousIds = FormActions.getPreviousIds();
        if (!previousIds.includes(identifier)) {
            previousIds.push(identifier);
            window.localStorage.setItem('previousIds', JSON.stringify(previousIds));
        }
        FormActions.registerId(identifier);
    },

    getPreviousIds() {
        var previousIds = window.localStorage.getItem('previousIds');
        if (!previousIds) {
            previousIds = [];
        } else {
            previousIds = JSON.parse(previousIds);
        }
        return previousIds;
    },

    registerId(identifier) {
        SentenceAPI.registerId(identifier, (error, serverResponse) => {
            return serverResponse;
        });
    },

    checkIdExists(identifier, callback) {
        SentenceAPI.checkIdExists(identifier, (error, serverResponse) => {
            callback(serverResponse.exists);
        });
    },

    checkIdIsValid(identifier) {
        return identifier.match(/[a-z]{3}[0-9]{3}/) !== null;
    },

    checkComment() {
        let comment = FormActions.getLocalComment();
        if (comment !== null && comment !== "") {
            FormActions.sendComment(comment);
        }
        FormActions.setLocalComment("");
    },

    sendComment(comment) {
        var sentences = FormActions.getLocalSentences();
        if (sentences) {
            sentences = sentences.map((sentence) => {return sentence.sentence_id});
        }
        let commentData = {
            annotator: FormActions.getAnnotator(),
            comment: comment,
            sentences: sentences,
            version: SentenceAPI.version
        }
        SentenceAPI.saveComment(commentData, (error, serverResponse) => {
            if (error) {
                console.log("Error saving comment!");
                console.log(error);
            }
        });
    },

    removeAnnotator() {
        SentenceAPI.annotator = null;
        window.localStorage.removeItem('annotator');
        //FormActions.checkComment();
        AppDispatcher.dispatch({
            eventName: 'logout-annotator',
        });
    },

    saveResponse(response) {
        FormActions.setLocalResponse(response);
        SentenceAPI.saveResponse(response, (error, serverResponse) => {
            FormActions.setProgress(FormActions.getAnnotator(), (error, progressData) => {
                AppDispatcher.dispatch({
                    eventName: 'save-response',
                    serverResponse: serverResponse
                });
            });
        });
    },

    removeIncompleteResponse(response) {
        FormActions.setLocalResponse(response);
        SentenceAPI.removeResponse(response, (error, serverResponse) => {
            AppDispatcher.dispatch({
                eventName: 'remove-response',
                serverResponse: serverResponse
            });
        });
    },

    getCategories() {
        return questions.map(question => {
            return question.impactType;
        });
    },

    checkResponseDone(response) {
        if (response.unanswerable) {
            return true;
        }
        return FormActions.getCategories().every(category => {
            if (!response.hasOwnProperty(category))
                return false;
            return true;
        });
    },

    checkSentenceDone(sentence) {
        let localData = FormActions.getLocalData();
        if (!localData.responses)
            return false;
        if (!localData.responses.hasOwnProperty(sentence.sentence_id))
            return false;
        let response = localData.responses[sentence.sentence_id];
        if (response.annotator !== FormActions.getAnnotator())
            return false;
        return  FormActions.checkResponseDone(response);
    },

    checkSentencesDone() {
        let localData = FormActions.getLocalData();
        if (!localData.sentences)
            return null;
        return localData.sentences.map((sentence) => {
            let sentenceDone = FormActions.checkSentenceDone(sentence);
            return {sentence_id: sentence.sentence_id, sentenceDone: sentenceDone};
        });
    },

    setLocalResponses(responses) {
        window.localStorage.setItem('responses', JSON.stringify(responses));
    },

    setLocalSentences(sentences) {
        window.localStorage.setItem('sentences', JSON.stringify(sentences));
    },

    setLocalComment(comment) {
        window.localStorage.setItem('comment', comment);
    },

    getLocalResponses() {
        let responses = window.localStorage.getItem('responses');
        return (responses) ? JSON.parse(responses) : null;
    },

    getLocalSentences() {
        let sentences = window.localStorage.getItem('sentences');
        return (sentences) ? JSON.parse(sentences) : null;
    },

    getLocalComment() {
        let comment = window.localStorage.getItem("comment");
        return (comment !== null) ? comment : "";
    },

    setLocalResponse(response) {
        var responses = JSON.parse(window.localStorage.getItem('responses'));
        if (!responses)
            responses = {};
        responses[response.sentence_id] = response;
        window.localStorage.setItem('responses', JSON.stringify(responses));
    },

    setLocalData(sentences, responses, comment) {
        FormActions.setLocalResponses(responses);
        FormActions.setLocalSentences(sentences);
        FormActions.setLocalComment(comment);
        //window.localStorage.setItem('sentences', JSON.stringify(sentences));
        //window.localStorage.setItem('responses', JSON.stringify(responses));
        //window.localStorage.setItem('comment', comment);
    },

    getLocalData() {
        return {
            sentences: FormActions.getLocalSentences(),
            responses: FormActions.getLocalResponses(),
            comment: FormActions.getLocalComment()
        }
        /*
        var sentences = window.localStorage.getItem('sentences');
        var responses = window.localStorage.getItem('responses');
        var comment = window.localStorage.getItem('comment');
        if (sentences)
            sentences = JSON.parse(sentences);
        if (responses)
            responses = JSON.parse(responses);
        return {
            sentences: sentences,
            responses: responses,
            comment: comment
        }
        */
    },

    clearLocalData() {
        window.localStorage.removeItem('sentences');
        window.localStorage.removeItem('responses');
        window.localStorage.removeItem('comment');
        AppDispatcher.dispatch({
            eventName: 'clear-responses'
        });
    },

    loadSentences(annotator) {
        let localData = FormActions.getLocalData();
        if (localData.sentences) {
            AppDispatcher.dispatch({
                eventName: 'load-sentences',
                sentences: localData.sentences,
                responses: localData.responses,
                comment: localData.comment
            });
        }
        else {
            SentenceAPI.loadSentences(annotator, (error, sentences) => {
                FormActions.setLocalData(sentences, null, null);
                AppDispatcher.dispatch({
                    eventName: 'load-sentences',
                    sentences: sentences,
                    responses: null,
                    comment: ""
                });
            });
        }
    },

    loadAnnotatorJudgements(annotator) {
        SentenceAPI.loadAnnotatorJudgements(annotator, (error, sentences) => {
            FormActions.extractResponses(sentences, annotator, (responses) => {
                FormActions.setLocalData(sentences, responses, "");
                AppDispatcher.dispatch({
                    eventName: 'load-judgements',
                    sentences: sentences,
                    responses: responses
                });
            });
        });
    },

    extractResponses(sentences, annotator, callback) {
        var responses = {};
        if (sentences) {
            sentences.forEach((sentence, index) => {
                sentence.annotations.forEach((annotation) => {
                    if (annotation.annotator === annotator) {
                        responses[sentence.sentence_id] = annotation;
                    }
                });
                if (index === sentences.length -1) {
                    callback(responses);
                }
            });
        } else {
            callback(null);
        }
    },

    loadNewSentences() {
        //FormActions.checkComment();
        FormActions.clearLocalData();
        let annotator = window.localStorage.getItem("annotator");
        FormActions.loadSentences(annotator);
    },


    setProgress(annotator, callback) {
        SentenceAPI.loadProgress(annotator, (error, progressData) => {
            FormActions.progress = progressData;
            return callback(error, progressData);
        });
    },

    loadProgress(annotator) {
        FormActions.setProgress(annotator, (error, progressData) => {
            AppDispatcher.dispatch({
                eventName: 'load-progress',
                progress: progressData
            });
        });
    },

    loadBoilerplate() {
        SentenceAPI.loadBoilerplate((error, boilerplate) => {
            AppDispatcher.dispatch({
                eventName: 'load-boilerplate',
                data: boilerplate
            });
        });
    }

}

export default FormActions;

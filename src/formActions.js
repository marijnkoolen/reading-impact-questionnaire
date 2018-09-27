
"use strict"

import AppDispatcher from './AppDispatcher.js';
import SentenceAPI from './sentenceAPI.js';
import questions from './questions.js';

const FormActions = {

    setSentenceServer(endpoint) {
        SentenceAPI.sentenceServer = endpoint;
    },

    getAnnotator() {
        return SentenceAPI.annotator;
    },

    setAnnotator(annotator) {
        SentenceAPI.annotator = annotator;
        window.localStorage.setItem("annotator", annotator);
        FormActions.loadSentences(annotator);
    },

    changeView(view) {
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
        previousIds.push(identifier);
        window.localStorage.setItem('previousIds', JSON.stringify(previousIds));
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

    removeAnnotator() {
        SentenceAPI.annotator = null;
        window.localStorage.removeItem('annotator');
        AppDispatcher.dispatch({
            eventName: 'logout-annotator',
        });
    },

    saveResponse(response) {
        FormActions.setLocalResponse(response);
        SentenceAPI.saveResponse(response, (error, serverResponse) => {
            AppDispatcher.dispatch({
                eventName: 'save-response',
                serverResponse: serverResponse
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

    setLocalResponse(response) {
        var responses = JSON.parse(window.localStorage.getItem('responses'));
        if (!responses)
            responses = {};
        responses[response.sentence_id] = response;
        window.localStorage.setItem('responses', JSON.stringify(responses));
    },

    setLocalData(sentences, responses) {
        window.localStorage.setItem('sentences', JSON.stringify(sentences));
        window.localStorage.setItem('responses', JSON.stringify(responses));
    },

    getLocalData() {
        var sentences = window.localStorage.getItem('sentences');
        var responses = window.localStorage.getItem('responses');
        if (sentences)
            sentences = JSON.parse(sentences);
        if (responses)
            responses = JSON.parse(responses);
        return {
            sentences: sentences,
            responses: responses
        }
    },

    clearLocalData() {
        window.localStorage.removeItem('sentences');
        window.localStorage.removeItem('responses');
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
                responses: localData.responses
            });
        }
        else {
            SentenceAPI.loadSentences(annotator, (error, sentences) => {
                FormActions.setLocalData(sentences, null);
                AppDispatcher.dispatch({
                    eventName: 'load-sentences',
                    sentences: sentences,
                    responses: {}
                });
            });
        }
    },

    loadNewSentences() {
        FormActions.clearLocalData();
        let annotator = window.localStorage.getItem("annotator");
        FormActions.loadSentences(annotator);
    },


    loadProgress(annotator) {
        SentenceAPI.loadProgress(annotator, (error, progressData) => {
            AppDispatcher.dispatch({
                eventName: 'load-progress',
                progress: progressData
            })
        })
    }

}

export default FormActions;

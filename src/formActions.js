
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

    saveResponse(response) {
        FormActions.setLocalResponse(response);
        SentenceAPI.saveResponse(response, (error, serverResponse) => {
            AppDispatcher.dispatch({
                eventName: 'save-response',
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
        return FormActions.getCategories().every(category => {
            if (!response.hasOwnProperty(category))
                return false;
            return true;
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
            console.log("loading local data");
            AppDispatcher.dispatch({
                eventName: 'load-sentences',
                sentences: localData.sentences,
                responses: localData.responses
            });
        }
        else {
            SentenceAPI.loadSentences(annotator, (error, sentences) => {
                FormActions.setLocalData(sentences, null);
                console.log("loading server data");
                AppDispatcher.dispatch({
                    eventName: 'load-sentences',
                    sentences: sentences,
                    responses: {}
                });
            });
        }
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

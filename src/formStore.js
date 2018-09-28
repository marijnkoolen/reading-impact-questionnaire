
"use strict"

import MicroEvent from 'microevent';
import AppDispatcher from './AppDispatcher.js';

class FormStore {
    loadSentences(sentences, responses) {
        this.trigger('load-sentences', sentences, responses);
    }
    loadJudgements(sentences, responses) {
        this.trigger('load-judgements', sentences, responses);
    }
    loadProgress(progress) {
        this.trigger('load-progress', progress);
    }
    checkIdentifier(annotator) {
        this.trigger('check-identifier', exists);
    }
    loginAnnotator(annotator) {
        this.trigger('login-annotator', annotator);
    }
    logoutAnnotator() {
        this.trigger('logout-annotator');
    }
    saveResponse(serverResponse) {
        this.trigger('save-response', serverResponse.sentence_id);
    }
    removeResponse(serverResponse) {
        this.trigger('remove-response', serverResponse.sentence_id);
    }
    clearResponses() {
        this.trigger('clear-responses');
    }
    changeView(view) {
        this.trigger('change-view', view);
    }
}

var AppFormStore = new FormStore();

MicroEvent.mixin(FormStore);

AppDispatcher.register(function(action) {

    switch(action.eventName) {
        case 'check-identifier':
            AppFormStore.checkIdentifier(action.identifier, action.callback);
            break;
        case 'login-annotator':
            AppFormStore.loginAnnotator(action.annotator, action.callback);
            break;
        case 'logout-annotator':
            AppFormStore.logoutAnnotator(action.callback);
            break;
        case 'load-progress':
            AppFormStore.loadProgress(action.progress, action.callback);
            break;
        case 'load-sentences':
            AppFormStore.loadSentences(action.sentences, action.responses, action.callback);
            break;
        case 'load-judgements':
            AppFormStore.loadJudgements(action.sentences, action.responses, action.callback);
            break;
        case 'clear-responses':
            AppFormStore.clearResponses(action.callback);
            break;
        case 'save-response':
            AppFormStore.saveResponse(action.serverResponse, action.callback);
            break;
        case 'remove-response':
            AppFormStore.removeResponse(action.serverResponse, action.callback);
            break;
        case 'change-view':
            AppFormStore.changeView(action.view, action.callback);
            break;
    }
})

export default AppFormStore;

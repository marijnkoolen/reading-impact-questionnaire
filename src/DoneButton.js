
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';
import AppFormStore from './formStore.js';
import questions from './questions.js';

class DoneButton extends Component {

    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
        this.state = {
            done: false,
            sentencesDone: []
        }
    }

    componentDidMount() {
        this.setCategories();
        AppFormStore.bind('save-response', this.checkDone.bind(this));
        AppFormStore.bind('remove-response', this.checkDone.bind(this));
        AppFormStore.bind('load-sentences', this.checkDone.bind(this));
    }

    changeView(event) {
        this.props.changeView(event);
    }

    setCategories() {
        let categories = questions.map(question => {
            return question.impactType;
        });
        this.setState({categories: categories}, () => {
            this.checkDone();
        });
    }

    checkDone() {
        let localData = FormActions.getLocalData();
        if (!localData.sentences)
            return false;
        let sentencesDone = localData.sentences.map((sentence) => {
            var responseDone = false;
            if (!localData.responses)
                return {sentence_id: sentence.sentence_id, responseDone: responseDone};
            if (!localData.responses.hasOwnProperty(sentence.sentence_id))
                return {sentence_id: sentence.sentence_id, responseDone: responseDone};
            let response = localData.responses[sentence.sentence_id];
            console.log("response:", response);
            responseDone = FormActions.checkResponseDone(response);
            return {sentence_id: sentence.sentence_id, responseDone: responseDone};
        });
        let done = sentencesDone.every(sentence => { return sentence.responseDone});
        this.setState({done: done, sentencesDone: sentencesDone});
    }

    loadNewSentences() {
        FormActions.clearLocalData();
        let annotator = window.localStorage.getItem("annotator");
        FormActions.loadSentences(annotator);
    }

    render() {
        let sentenceChecks = this.state.sentencesDone.map((sentence, index) => {
            let buttonClass = (sentence.responseDone) ? "btn btn-success" : "btn btn-danger";
            return (
                <a href={'#sentence-block-' + sentence.sentence_id} key={index+1}>
                    <button className={buttonClass}>
                        {index+1}
                    </button>
                    {' '}
                </a>
            )
        })
        return (
            <div className="done">
                <div className="sentence-checks">
                    <div>Zinnen volledig beantwoord:</div>
                    {sentenceChecks}
                </div>
                <div className="buttons">
                    <button
                        type="button"
                        className="done btn btn-primary"
                        disabled={!this.state.done}
                        name="thankyou"
                        onClick={this.changeView.bind(this)}
                    >
                        Afsluiten!
                    </button>
                    {' '}
                    <a
                        type="button"
                        href="#top"
                        className="done btn btn-primary"
                        disabled={!this.state.done}
                        onClick={this.loadNewSentences.bind(this)}
                    >
                        Meer zinnen beoordelen!
                    </a>
                </div>
            </div>
        )
    }
}

export default DoneButton;


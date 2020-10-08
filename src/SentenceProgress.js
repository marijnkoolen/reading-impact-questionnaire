
"use strict"

import React, {Component} from 'react';
import FormActions from './formActions.js';
import AppFormStore from './formStore.js';
import questions from './questions.js';

class SentenceProgress extends Component {

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

    componentWillUnmount() {
        AppFormStore.unbind('save-response', this.checkDone.bind(this));
        AppFormStore.unbind('remove-response', this.checkDone.bind(this));
        AppFormStore.unbind('load-sentences', this.checkDone.bind(this));

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
        let sentencesDone = FormActions.checkSentencesDone(this.props.questions);
        let done = sentencesDone.every(sentence => { return sentence.sentenceDone});
        this.setState({done: done, sentencesDone: sentencesDone});
        this.props.checkDone(done);
    }

    loadNewSentences() {
        FormActions.loadNewSentences();
    }

    render() {
        let sentenceChecks = this.state.sentencesDone.map((sentence, index) => {
            let buttonClass = (sentence.sentenceDone) ? "btn btn-success" : "btn btn-danger";
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
                    <div>{this.props.boilerplate.progress.answered}:</div>
                    {sentenceChecks}
                </div>
            </div>
        )
    }
}

export default SentenceProgress;


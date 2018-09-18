
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';
import AppFormStore from './formStore.js';
import questions from './questions.js';

class DoneButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            done: false
        }
    }

    componentDidMount() {
        this.setCategories();
        AppFormStore.bind('save-response', this.checkDone.bind(this));
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
        let done = localData.sentences.every(sentence => {
            if (!localData.responses.hasOwnProperty(sentence.sentence_id))
                return false;
            let response = localData.responses[sentence.sentence_id];
            return FormActions.checkResponseDone(response);
        });
        this.setState({done: done});
    }

    render() {
        return (
            <div className="done">
                <button
                    type="button"
                    className="done btn btn-primary"
                    disabled={!this.state.done}
                >
                    I am done!
                </button>
                {' '}
                <button
                    type="button"
                    className="done btn btn-primary"
                    disabled={!this.state.done}
                >
                    Show more!
                </button>
            </div>
        )
    }
}

export default DoneButton;



"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';

class AnnotatorInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            annotator: ''
        }
    }

    componentDidMount() {
        let annotator = localStorage.getItem("annotator");
        if (annotator) {
            this.setAnnotator(annotator);
        }
    }

    setAnnotator(annotator) {
        this.setState({annotator: annotator});
        //FormActions.loadSentences(annotator);
        localStorage.setItem("annotator", annotator);
    }

    handleEmailSubmit() {
        this.setAnnotator(this.state.annotator);
    }

    handleEmailChange(event) {
        let email = event.target.value;
        this.setState({annotator: email});
    }

    render() {
        return (
            <div>
                <label>Emailadres:</label>
                <input
                    type="email"
                    name="annotator_email"
                    placeholder="Uw emailadres"
                    value={this.state.annotator}
                    onChange={this.handleEmailChange.bind(this)}
                />
                <button
                    className="btn btn-default"
                    onClick={this.handleEmailSubmit.bind(this)}
                    >
                    verder
                </button>
            </div>
        )
    }
}

export default AnnotatorInfo;


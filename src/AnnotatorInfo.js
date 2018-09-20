
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
        console.log("annotator set:", annotator);
        FormActions.setAnnotator(annotator);
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
            <span className="author-info">
                <label>Emailadres:</label>
                <input
                    type="email"
                    name="annotator_email"
                    placeholder="Uw emailadres"
                    value={this.state.annotator}
                    onChange={this.handleEmailChange.bind(this)}
                /> {' '}
                <button
                    className="btn btn-primary"
                    onClick={this.handleEmailSubmit.bind(this)}
                    >
                    verder
                </button>
            </span>
        )
    }
}

export default AnnotatorInfo;


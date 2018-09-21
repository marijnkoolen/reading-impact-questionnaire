
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';

class AnnotatorInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            annotator: '',
            loggedIn: false
        }
    }

    componentDidMount() {
        let annotator = window.localStorage.getItem("annotator");
        if (annotator) {
            this.setAnnotator(annotator);
        }
    }

    setAnnotator(annotator) {
        this.setState({annotator: annotator, loggedIn: true});
        FormActions.setAnnotator(annotator);
    }

    handleEmailSubmit() {
        this.setAnnotator(this.state.annotator);
    }

    handleEmailChange(event) {
        let email = event.target.value;
        this.setState({annotator: email});
    }

    handleLogout() {
        this.setState({annotator: '', loggedIn: false});
        FormActions.removeAnnotator();
    }

    render() {
        let login = (
            <span>
                <input
                    type="text"
                    name="annotator_email"
                    placeholder="Uw emailadres"
                    value={this.state.annotator}
                    onChange={this.handleEmailChange.bind(this)}
                /> {' '}
                <button
                    className="btn btn-primary"
                    onClick={this.handleEmailSubmit.bind(this)}
                    >
                    Aanmelden
                </button>
            </span>
        )

        let logout = (
            <span>
                <span className="annotator-name"
                >
                    {this.state.annotator}
                </span>
                <button
                    className="btn btn-primary"
                    onClick={this.handleLogout.bind(this)}
                >
                    Afmelden
                </button>
            </span>
        )

        return (
            <span className="author-info">
                <label>Naam: {' '}</label>{' '}
                {(this.state.loggedIn) ? logout : login}
            </span>
        )
    }
}

export default AnnotatorInfo;


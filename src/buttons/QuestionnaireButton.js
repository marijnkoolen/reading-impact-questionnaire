
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from '../formActions.js';

class QuestionnaireButton extends Component {

    constructor(props) {
        super(props);
    }

    changeView() {
        FormActions.changeView("questionnaire");
    }

    render() {
        let labelText = (this.props.labelText) ? this.props.labelText : "Naar de vragenlijst";
        return (
            <button
                className="btn btn-primary"
                onClick={this.changeView.bind(this)}
            >
                {labelText}
            </button>
        )
    }
}

export default QuestionnaireButton;


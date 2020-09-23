
"use strict"

import React, {Component} from 'react';
import FormActions from './formActions.js';
import { Checkbox } from 'react-bootstrap';
import ReactDOM from 'react-dom';

class Demographics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'age': null,
            'gender': null,
            'genderInput': '',
            'language': null,
            'read_books': null,
            'read_reviews': null,
            'write_reviews': null,
            'empty': true
        }
    }

    submitDemographics() {
        FormActions.sendDemographics(this.state);
        this.setState({feedback: this.props.boilerplate.demographics.feedback});
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value,
            empty: false }, () => {
                console.log(this.state);
        })
    }

    handleGenderChange(event) {
        let genderInput = event.target.value;
        this.setState({
            gender: "other", 
            genderInput: genderInput, 
            empty: false, 
            genderText: true}, () => {
                console.log(this.state);
        });
    }


    render() {

        let makeTextInput = (question, label) => {
            if (question.key === 'gender') {
                return (
                    <span>
                        {': '}
                        <input
                            name={question.key}
                            value={this.state.genderInput}
                            onChange={this.handleGenderChange.bind(this)}
                        />
                    </span>
                )

            }
        }

        let makeRadio = (question, label) => {
            return (
                <div key={label.value}
                    className="radio-option"
                >
                <input 
                    name={question.key}
                    value={label.value}
                    id={question.key + '-' + label.value}
                    type="radio"
                    checked={this.state[question.key] === label.value}
                    onChange={this.handleChange.bind(this)}
                    />
                {' '}
                <label htmlFor={question.key + '-' + label.value}>{label.label}</label>
                {(label.textInput) ? makeTextInput(question, label) : null}
            </div>)
        }

        let questions = this.props.demographics.questions.map(question => {
            if (question.answerType === 'category') {
                let options = question.labels.map(label => {
                    return makeRadio(question, label);
                });
                return (
                    <div key={question.key}
                        className="question demographics-question"
                    >
                        <div><strong>{question.label}</strong></div>
                        {options}
                    </div>
                )
            }
        })
        console.log(this.props.demographics);
        return (
            <div className="demographics">
                <div><h2>{this.props.demographics.title}</h2></div>
                <div>{this.props.demographics.intro}</div>
                {questions}

                {' '}
                <button
                    className="btn btn-primary"
                    disabled={this.state.empty === true}
                    onClick={this.submitDemographics.bind(this)}
                >
                    {this.props.boilerplate.button.demographics}
                </button>
                <div className="demographics-feedback">
                    {this.state.feedback}
                </div>
            </div>
        )
    }
}

export default Demographics;
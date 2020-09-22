
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReadmeButton from './buttons/ReadmeButton.js';
import LoginButton from './buttons/LoginButton.js';
import CommentBox from './CommentBox.js';
import Demographics from './Demographics.js';
import AppFormStore from './formStore.js';
import FormActions from './formActions.js';

class ThankYou extends Component {

    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
        this.state = {
            previousId: null,
            annotator: FormActions.getPrevAnnotator()
        }
    }

    changeView(event) {
        let view = event.target.name;
        this.props.changeView(view);
    }

    loadNewSentences() {
        FormActions.loadNewSentences();
        this.props.changeView("questionnaire");
    }

    render() {
        console.log('has_demographics:', this.props.hasDemographics);
        console.log('demographics:', this.props.demographics);
        let demographics = (this.props.hasDemographics) ? null : (
            <Demographics boilerplate={this.props.boilerplate} demographics={this.props.demographics}/>
        )
        return (
            <div className="thankyou">
                <h2>
                    {this.props.boilerplate.thanks.contribution}
                </h2>
                <p dangerouslySetInnerHTML={{ __html: this.props.boilerplate.thanks.contact }} />
                <div className="closing">
                    {demographics}
                    <CommentBox boilerplate={this.props.boilerplate}/>
                    <ReadmeButton labelText={this.props.boilerplate.button.back_to_explanation}/>
                    {' '}
                    <LoginButton labelText={this.props.boilerplate.button.login_again}/>
                </div>
            </div>
        )
    }
}

export default ThankYou;

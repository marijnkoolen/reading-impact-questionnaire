
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';
import LogoutButton from './LogoutButton.js';
import ReadmeButton from './ReadmeButton.js';
import SentenceProgress from './SentenceProgress.js';
import SentenceQuestions from './SentenceQuestions.js';
import SentenceAPI from './sentenceAPI.js';
import AppFormStore from './formStore.js';

class Questionnaire extends Component {

    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
        this.state = {
            sentences: null,
            responses: [],
            progress: null,
        }
    }

    changeView(event) {
        let view = event.target.name;
        this.props.changeView(view);
    }

    componentDidMount() {
        AppFormStore.bind('load-sentences', this.setSentences.bind(this));
        AppFormStore.bind('load-progress', this.setProgress.bind(this));
        AppFormStore.bind('clear-responses', this.clearResponses.bind(this));
        AppFormStore.bind('logout-annotator', this.logoutAnnotator.bind(this));
        let annotator = window.localStorage.getItem("annotator");
        if (annotator)
            FormActions.loadSentences(annotator);
            //this.loginAnnotator(annotator);
    }

    componentWillUnmount() {
        AppFormStore.unbind('load-sentences', this.setSentences.bind(this));
        AppFormStore.unbind('load-progress', this.setProgress.bind(this));
        AppFormStore.unbind('clear-responses', this.clearResponses.bind(this));
        AppFormStore.unbind('logout-annotator', this.logoutAnnotator.bind(this));
    }

    logoutAnnotator(annotator) {
        this.setState({progress: null});
    }

    clearResponses() {
        this.setState({responses: []});
    }

    setSentences(sentences, responses) {
        this.setState({
            sentences: sentences,
            responses: responses
        });
        let annotator = window.localStorage.getItem("annotator");
        FormActions.loadProgress(annotator);
    }

    setProgress(progress) {
        this.setState({progress: progress});
    }


    render() {
        let annotator = window.localStorage.getItem('annotator');
        let sentenceBlocks = null;
        let progressBar = null;
        if (annotator && this.state.sentences) {
            sentenceBlocks = this.state.sentences.map((sentence, index) => {
                sentence.number = index+1;
                var response = {unanswerable: false};
                let responses = this.state.responses;
                if (responses && responses.hasOwnProperty(sentence.sentence_id)) {
                    if (responses[sentence.sentence_id].annotator === annotator)
                        response = responses[sentence.sentence_id];
                }
                console.log(response);
                return (
                    <SentenceQuestions
                        key={sentence.number}
                        sentence={sentence}
                        response={response}
                    />
                )
            });
        }

        let makeProgressBar = (progress) => {
            return (
                <div className="header progress">
                    <span>Totaal te beoordelen zinnen {progress.sentences_total}.</span>
                    {' '}
                    <span>Voldoende oordelen verzameld voor {progress.sentences_done} zinnen.</span>
                    {' '}
                    <span>Zinnen door u beoordeelt: {progress.sentences_done_by_you}.</span>
                </div>
            )
        }
        if (this.state.progress) {
            progressBar = makeProgressBar(this.state.progress);
        }

        var closing = (sentenceBlocks) ? (<SentenceProgress changeView={this.changeView.bind(this)}/>) : null;

        return (
            <div className="col-md-10">
                <div className="row header">
                    <p>U bent aangemeld met ID: {annotator}</p>
                    <LogoutButton/>
                    {' '}
                    <ReadmeButton/>
                    {progressBar}
                </div>
                <div className="row">
                    {(annotator) ? sentenceBlocks : null}
                </div>
                <div className="row closing">
                    {closing}
                </div>
            </div>
        )
    }
}

export default Questionnaire;



"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';
import AnnotatorInfo from './AnnotatorInfo.js';
import DoneButton from './DoneButton.js';
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
        let annotator = window.localStorage.getItem("annotator");
        FormActions.loadSentences(annotator);
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
        let sentenceBlocks = null;
        let progressBar = null;
        if (this.state.sentences) {
            sentenceBlocks = this.state.sentences.map((sentence, index) => {
                sentence.number = index+1;
                var response = null;
                if (this.state.responses && this.state.responses.hasOwnProperty(sentence.sentence_id))
                    response = this.state.responses[sentence.sentence_id];
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
                    Zinnen totaal: {progress.sentences_total}, klaar: {progress.sentences_done}, door u beoordeeld: {progress.sentences_done_by_you}.
                </div>
            )
        }
        if (this.state.progress) {
            progressBar = makeProgressBar(this.state.progress);
        }


        return (
            <div className="col-md-10">
                <div className="row header">
                    <button
                        className="btn btn-primary"
                        name="readme"
                        onClick={this.changeView.bind(this)}
                    >
                        Terug naar uitleg
                    </button>
                    <AnnotatorInfo/>
                    {progressBar}
                </div>
                <div className="row">
                    {sentenceBlocks}
                </div>
                <div className="row closing">
                    <DoneButton
                        changeView={this.changeView.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default Questionnaire;


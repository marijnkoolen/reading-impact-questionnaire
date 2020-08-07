
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';
import LogoutButton from './LogoutButton.js';
import AllJudgementsButton from './AllJudgementsButton.js';
import ReadmeButton from './ReadmeButton.js';
import SentenceProgress from './SentenceProgress.js';
import SentenceQuestions from './SentenceQuestions.js';
import SentenceAPI from './sentenceAPI.js';
import AppFormStore from './formStore.js';

class Questionnaire extends Component {

    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
        this.checkDone = this.checkDone.bind(this);
        this.state = {
            done: false,
            sentences: null,
            responses: [],
            progress: null,
            comments: "",
        }
    }

    updateComments(event) {
        let comments = event.target.value;
        window.localStorage.setItem("comments", comments);
        this.setState({comments: comments});
    }

    changeView(event) {
        let view = event.target.name;
        this.props.changeView(view);
    }

    componentDidMount() {
        AppFormStore.bind('load-sentences', this.setSentences.bind(this));
        AppFormStore.bind('load-progress', this.setProgress.bind(this));
        AppFormStore.bind('save-response', this.setProgress.bind(this));
        AppFormStore.bind('clear-responses', this.clearResponses.bind(this));
        AppFormStore.bind('logout-annotator', this.logoutAnnotator.bind(this));
        let annotator = window.localStorage.getItem("annotator");
        if (annotator)
            this.loadSentences(annotator);
            //this.loginAnnotator(annotator);
    }

    componentWillUnmount() {
        AppFormStore.unbind('load-sentences', this.setSentences.bind(this));
        AppFormStore.unbind('load-progress', this.setProgress.bind(this));
        AppFormStore.unbind('save-response', this.setProgress.bind(this));
        AppFormStore.unbind('clear-responses', this.clearResponses.bind(this));
        AppFormStore.unbind('logout-annotator', this.logoutAnnotator.bind(this));
    }

    loadSentences(annotator) {
        if (FormActions.isDispatching()) {
            setTimeout(FormActions.loadSentences, 100, annotator)
        } else {
            FormActions.loadSentences(annotator);
        }

    }

    logoutAnnotator(annotator) {
        this.setState({progress: null});
    }

    clearResponses() {
        this.setState({responses: [], comments: ""});
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
        let progressData = FormActions.progress;
        console.debug(progressData);
        this.setState({progress: progressData});
    }

    loadNewSentences() {
        FormActions.loadNewSentences();
        this.setState({done: false});
    }

    checkDone(done) {
        if (done !== this.state.done) {
            this.setState({done: done});
        }
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
            /*
                    <span>Totaal te beoordelen zinnen {progress.sentences_total}.</span>
                    {' '}
            */
            return (
                <div
                    className="header header-progress">
                    <span>Voldoende oordelen verzameld voor {progress.sentences_done} zinnen.</span>
                    {' '}
                    <span>Zinnen door u beoordeeld: {progress.sentences_done_by_you}.</span>
                    {' '}
                    <span
                        className="badge progress-info"
                        data-toggle="popover"
                        title="Uitleg"
                        data-content={"Zinnen met voldoende oordelen zijn door tenminste 3 mensen beoordeeld. Totaal te beoordelen zinnen: " + progress.sentences_total}
                        data-trigger="hover"
                    >i</span>
                </div>
            )
        }
        if (this.state.progress) {
            progressBar = makeProgressBar(this.state.progress);
        }

        var sentenceProgress = (sentenceBlocks) ? (<SentenceProgress checkDone={this.checkDone.bind(this)} changeView={this.changeView.bind(this)}/>) : null;
        var enablePopover = () => {
            $('[data-toggle="popover"]').popover();
        }
        window.setTimeout(enablePopover, 200);

        return (
            <div>
                <div className="row header">
                    <p>U bent aangemeld met ID: {annotator}</p>
                    <LogoutButton/>
                    {' '}
                    <ReadmeButton/>
                    {progressBar}
                </div>
                <div className="row">
                    <p>Beoordeel onderstaande zinnen. Zinnen met een rood label zijn nog niet volledig beoordeeld. Als het label groen wordt, wordt uw oordeel opgeslagen.</p>
                    {sentenceProgress}
                    {(annotator) ? sentenceBlocks : null}
                </div>
                <div className="row closing">
                    {sentenceProgress}
                    <div className="buttons">
                        <LogoutButton/>
                        {' '}
                        <a
                            type="button"
                            href="#top"
                            className="done btn btn-primary"
                            disabled={!this.state.done}
                            onClick={this.loadNewSentences.bind(this)}
                        >
                            Meer zinnen beoordelen
                        </a>
                        {' '}
                        <AllJudgementsButton/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Questionnaire;


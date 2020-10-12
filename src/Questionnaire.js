
"use strict"

import React, {Component} from 'react';
import FormActions from './formActions.js';
import LogoutButton from './buttons/LogoutButton.js';
import AllJudgementsButton from './buttons/AllJudgementsButton.js';
import ReadmeButton from './buttons/ReadmeButton.js';
import SentenceProgress from './SentenceProgress.js';
import SentenceQuestions from './SentenceQuestions.js';
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
        const boilerplate = this.props.boilerplate;
        let annotator = window.localStorage.getItem('annotator');
        let sentenceBlocks = null;
        let progressBar = null;
        if (annotator && this.state.sentences) {
            sentenceBlocks = this.state.sentences.map((sentence, index) => {
                sentence.number = index+1;
                var response = {unanswerable: false, no_impact: false};
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
                        boilerplate={boilerplate}
                        questions={this.props.questions}
                    />
                )
            });
        }

        let makeProgressBar = (progress) => {
            /*
                    <span>{boilerplate.progress.total} {progress.sentences_total}.</span>
                    {' '}
                    <span>{boilerplate.progress.done} {progress.sentences_done} {boilerplate.progress.unit}.</span>
                    {' '}
            */
            return (
                <div
                    className="header header-progress">
                    <span>{boilerplate.progress.done_by_you}: {progress.sentences_done_by_you}.</span>
                    {' '}
                    <span>{boilerplate.progress.total} {progress.sentences_total}.</span>
                    {' '}
                    <span>{boilerplate.progress.done} {progress.sentences_done} {boilerplate.progress.unit}.</span>
                    {' '}
                    <span
                        className="badge progress-info"
                        data-toggle="popover"
                        title={boilerplate.info.explanation}
                        data-content={boilerplate.info.sentence_done + boilerplate.progress.total + ": " + progress.sentences_total}
                        data-trigger="hover"
                    >i</span>
                </div>
            )
        }
        if (this.state.progress) {
            progressBar = makeProgressBar(this.state.progress);
        }

        var sentenceProgress = (sentenceBlocks) ? (<SentenceProgress checkDone={this.checkDone.bind(this)} changeView={this.changeView.bind(this)} boilerplate={this.props.boilerplate} questions={this.props.questions}/>) : null;
        var enablePopover = () => {
            $('[data-toggle="popover"]').popover();
        }
        window.setTimeout(enablePopover, 200);

        return (
            <div>
                <div className="row header">
                    <p>{boilerplate.login.login_id}: {annotator}</p>
                    <LogoutButton labelText={boilerplate.button.logout}/>
                    {' '}
                    <ReadmeButton labelText={boilerplate.button.show_explanation}/>
                    {progressBar}
                </div>
                <div className="row">
                    <p>{boilerplate.sentences.sentence_todo}</p>
                    {sentenceProgress}
                    {(annotator) ? sentenceBlocks : null}
                </div>
                <div className="row closing">
                    {sentenceProgress}
                    <div className="buttons">
                        <LogoutButton labelText={boilerplate.button.logout}/>
                        {' '}
                        <a
                            type="button"
                            href="#top"
                            className="done btn btn-primary"
                            disabled={!this.state.done}
                            onClick={this.loadNewSentences.bind(this)}
                        >
                            {boilerplate.button.judge_more}
                        </a>
                        {' '}
                        <AllJudgementsButton labelText={boilerplate.button.show_judged}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Questionnaire;


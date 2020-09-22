
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';
import LogoutButton from './buttons/LogoutButton.js';
import ReadmeButton from './buttons/ReadmeButton.js';
import QuestionnaireButton from './buttons/QuestionnaireButton.js';
import SentenceQuestions from './SentenceQuestions.js';
import SentenceAPI from './sentenceAPI.js';
import AppFormStore from './formStore.js';

class AllJudgements extends Component {

    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
        this.state = {
            sentences: null,
            responses: [],
            progress: null,
            boilerplate: null,
        }
    }

    changeView(event) {
        let view = event.target.name;
        this.props.changeView(view);
    }

    componentDidMount() {
        AppFormStore.bind('load-judgements', this.setJudgements.bind(this));
        AppFormStore.bind('load-progress', this.setProgress.bind(this));
        AppFormStore.bind('clear-responses', this.clearResponses.bind(this));
        AppFormStore.bind('logout-annotator', this.logoutAnnotator.bind(this));
        let annotator = window.localStorage.getItem("annotator");
        if (annotator)
            FormActions.loadAnnotatorJudgements(annotator);
    }

    componentWillUnmount() {
        AppFormStore.unbind('load-sentences', this.setJudgements.bind(this));
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

    setJudgements(sentences, responses) {
        //console.log(sentences);
        //console.log(responses);
        let annotator = FormActions.getAnnotator();
        if (this.refs.judgementsRef) {
            this.setState({
                sentences: sentences,
                responses: responses
            });

        }
        FormActions.loadProgress(annotator);
    }

    setProgress(progress) {
        this.setState({progress: progress});
    }

    backToQuestionnaire() {
        FormActions.setLocalData(null, null);
        FormActions.changeView("questionnaire");
    }

    render() {
        const boilerplate = this.props.boilerplate;
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
                        boilerplate={boilerplate}
                        questions={this.props.questions}
                    />
                )
            });
        }

        let makeProgressBar = (progress) => {
            return (
                <div className="header progress">
                    <span>{boilerplate.progress.total} {progress.sentences_total}.</span>
                    {' '}
                    <span>{boilerplate.progress.done} {progress.sentences_done} {boilerplate.progress.unit}.</span>
                    {' '}
                    <span>{boilerplate.progress.done_by_you}: {progress.sentences_done_by_you}.</span>
                </div>
            )
        }
        if (this.state.progress) {
            progressBar = makeProgressBar(this.state.progress);
        }

        return (
            <div className="col-md-10" ref="judgementsRef">
                <div className="row header">
                    <p>U bent aangemeld met ID: {annotator}</p>
                    <LogoutButton labelText={boilerplate.button.logout}/>
                    {' '}
                    <ReadmeButton labelText={boilerplate.button.show_explanation}/>
                    {' '}
                    <QuestionnaireButton labelText={boilerplate.button.show_to_do}/>
                    {progressBar}
                </div>
                <div className="row">
                    <p>{boilerplate.sentences.sentences_judged}</p>
                    {(annotator) ? sentenceBlocks : null}
                </div>
                <div className="row closing">
                    <ReadmeButton labelText={boilerplate.button.show_explanation}/>
                    {' '}
                    <LogoutButton labelText={boilerplate.button.logout}/>
                    {' '}
                    <button
                        className="btn btn-primary"
                        name="back-to-questionnaire"
                        onClick={this.backToQuestionnaire.bind(this)}
                    >
                        {boilerplate.button.show_to_do}
                    </button>
                </div>
            </div>
        )
    }
}

export default AllJudgements;



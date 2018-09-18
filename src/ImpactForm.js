
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';
import AnnotatorInfo from './AnnotatorInfo.js';
import DoneButton from './DoneButton.js';
import SentenceQuestions from './SentenceQuestions.js';
import SentenceAPI from './sentenceAPI.js';
import AppFormStore from './formStore.js';

class ImpactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentences: null,
            progress: null
        }
    }

    componentDidMount() {
        FormActions.setSentenceServer(this.props.apiUrl);
        AppFormStore.bind('load-sentences', this.setSentences.bind(this));
        AppFormStore.bind('load-progress', this.setProgress.bind(this));
        let annotator = localStorage.getItem("annotator");
        FormActions.loadSentences(annotator);
    }

    setSentences(sentences, responses) {
        this.setState({
            sentences: sentences,
            responses: responses
        });
        let annotator = localStorage.getItem("annotator");
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
                if (this.state.responses.hasOwnProperty(sentence.sentence_id))
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
                <div className="header progress">{progress.sentences_done} van {progress.sentences_total} zinnen gedaan.</div>
            )
        }
        if (this.state.progress) {
            progressBar = makeProgressBar(this.state.progress);
        }

        return (
            <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-10">
                    <div className="row header">
                        <AnnotatorInfo/>
                        {progressBar}
                    </div>
                    <div className="row">
                        {sentenceBlocks}
                    </div>
                    <div>
                        <DoneButton/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImpactForm;


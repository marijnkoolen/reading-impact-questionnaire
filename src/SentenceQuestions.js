
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LikertButton from './LikertButton.js';
import CategoryButton from './CategoryButton.js';
import FormActions from './formActions.js';
import AppFormStore from './formStore.js';
import questions from './questions.js';

class SentenceQuestions extends Component {
    constructor(props) {
        super(props);
        this.setResponse = this.setResponse.bind(this);
        this.state = {
            response: this.props.response,
            responseSaved: false,
        }
    }

    componentDidMount() {
        AppFormStore.bind('save-response', this.setResponseStatus.bind(this));
        AppFormStore.bind('clear-responses', this.clearResponses.bind(this));
        $('[data-toggle="popover"]').popover();
    }

    componentWillUnmount() {
        AppFormStore.unbind('save-response', this.setResponseStatus.bind(this));
        AppFormStore.unbind('clear-responses', this.clearResponses.bind(this));
    }

    clearResponses() {
        console.log("clearing responses");
        this.setState({response: {unanswerable: false}});
    }

    setResponseStatus(sentence_id) {
        if (this.props.sentence.sentence_id == sentence_id) {
            this.setState({responseSaved: true});
        }
    }

    setResponse(questionResponse) {
        var sentenceResponse = this.state.response;
        if (!sentenceResponse) {
            sentenceResponse = {};
        }
        if (!sentenceResponse.annotator) {
            sentenceResponse.annotator = FormActions.getAnnotator();
        }
        if (!sentenceResponse.sentence_id) {
            sentenceResponse.sentence_id = this.props.sentence.sentence_id;
        }
        sentenceResponse[questionResponse.category] = questionResponse.value;
        if (questionResponse.category === "emotional_scale" && questionResponse.value === "0") {
            sentenceResponse["narrative_scale"] = "0";
            sentenceResponse["style_scale"] = "0";
            sentenceResponse["emotional_valence"] = "na";
        }
        if (sentenceResponse["narrative_scale"] > "0" && sentenceResponse["emotional_scale"] === "0") {
            window.alert("Emotionele impact kan niet afwezig zijn als er narratieve gevoelens uitgedrukt worden. ");
            sentenceResponse["narrative_scale"] = "0";
        }
        if (sentenceResponse["style_scale"] > "0" && sentenceResponse["emotional_scale"] === "0") {
            window.alert("Emotionele impact kan niet afwezig zijn als er gevoelens m.b.t. stijl uitgedrukt worden. ");
            sentenceResponse["style_scale"] = "0";
        }
        if (sentenceResponse["emotional_valence"] && sentenceResponse["emotional_valence"] !== "na" && sentenceResponse["emotional_scale"] === "0") {
            window.alert("Gevoelens kunnen niet prettig of onprettig zijn als er geen emotionele impact is. ");
            sentenceResponse["emotional_valence"] = "na";
        }
        if (FormActions.checkResponseDone(sentenceResponse)) {
            FormActions.saveResponse(sentenceResponse);
        } else if (questionResponse.category === "unanswerable") {
            FormActions.removeIncompleteResponse(sentenceResponse);
        }
        FormActions.setLocalResponse(sentenceResponse);
        this.setState({response: sentenceResponse});
    }

    makeLikertRange() {
        var list = [];
        for (var i = 0; i < 5; i++) {
            list.push(i);
        }
        return list;
    }

    makeQuestion(question, sentence_id) {
        if (this.state.response && this.state.response.unanswerable) {
            return (
                <div></div>
            )
        }
        let component = this;
        //console.log("rendering sentence", sentence_id);
        //console.log(this.state.response);
        var makeCategoryButton = (question, category) => {
            var selected = false;
            if (this.state.response) {
                if (this.state.response[question.impactType] === category.value) {
                    selected = true;
                }
            }
            return (
                <CategoryButton
                    key={category.value}
                    name={sentence_id + "-" + question.impactType}
                    impactType={question.impactType}
                    value={category.value}
                    label={category.label}
                    setResponse={this.setResponse.bind(this)}
                    selected={selected}
                />
            )
        }
        var makeLikertButton = (question, value)=> {
            var selected = false;
            if (this.state.response) {
                if (this.state.response[question.impactType] === value.toString()) {
                    selected = true;
                }
            }
            return (
                <LikertButton
                    key={value}
                    name={sentence_id + "-" + question.impactType}
                    impactType={question.impactType}
                    value={value}
                    setResponse={this.setResponse.bind(this)}
                    selected={selected}
                />
            );
        }
        var likertButtons = this.makeLikertRange().map(value => {
            return makeLikertButton(question, value);
        });
        var categoryButtons = question.labels.map(value => {
            return makeCategoryButton(question, value);
        });
        var makeButtons = question => {
            if (question.answerType === "likert") {
                return (
                    <div key={question.key}>
                        <div>
                        <label>Geen of twijfelachtig</label>
                        {' '}
                        {likertButtons}
                        <label>Duidelijk of zeer sterk</label>
                        </div>
                    </div>
                )
            }
            else if (question.answerType === "category") {
                return (
                    <div key={question.key}>
                        {categoryButtons}
                    </div>
                )
            }
        }

        let buttons = makeButtons(question);
        return (
            <div className={"sentence-" + question.questionType} key={question.key}>
                <div className="row">
                    <label key={question.key}>{question.label}</label>
                    <span
                        className="badge term-info"
                        data-toggle="popover"
                        title="Uitleg"
                        data-content={question.explanation}
                        data-trigger="hover"
                    >i</span>
                </div>
                <div>{buttons}</div>
            </div>
        )
    }

    getAnswerable() {
        let response = this.state.response;
        console.log(response);
        if (response && response.unanswerable)
            return response.unanswerable;
        else
            return false;
    }

    setAnswerable(event) {
        let unanswerable = event.target.checked;
        let response = this.state.response;
        if (!response)
            response = {};
        response.unanswerable = unanswerable;
        this.setState({response: response})
        //this.setState({unanswerable: unanswerable})
        this.setResponse({category: "unanswerable", "value": unanswerable});
        FormActions.checkDone
    }

    makeQuestionList() {
        let questionList = questions.map(question => {
            return this.makeQuestion(question, this.props.sentence.sentence_id)
        });
        var unanswerable = false;
        if (this.state.response && this.state.response.unanswerable)
            unanswerable = this.state.response.unanswerable;
        return (unanswerable) ? (<div></div>) : questionList;
    }

    render() {
        let answerableExplanation = "Vink dit aan wanneer de zin bijvoorbeeld niet in het Nederlands is, volledig onbegrijpelijk is of alleen een gegeven zoals isbn of prijs bevat."
        let answerable = (
            <div>
                <label>
                    <input
                        name={this.props.sentence.sentence_id + "-answerable"}
                        type="checkbox"
                        onChange={this.setAnswerable.bind(this)}
                        checked={this.state.response.unanswerable}
                    />
                    &nbsp;Voor deze zin zijn onderstaande vragen niet te beantwoorden&nbsp;
                    <span
                        className="badge term-info"
                        data-toggle="popover"
                        title="Uitleg"
                        data-content={answerableExplanation}
                        data-trigger="hover"
                    >i</span>
                </label>
            </div>
        )

        let responseStatus = (<div></div>);
        if (this.state.responseSaved) {
            responseStatus = (<div>Antwoord opgeslagen</div>);
        }

        let questionList = this.makeQuestionList();
        var sentenceLabelClass = "badge progress-bar-";
        let sentenceDone = FormActions.checkSentenceDone(this.props.sentence);
        sentenceLabelClass += (sentenceDone) ? "success" : "danger";

        return (
            <div className="sentence-block" key={this.props.sentence.sentence_id}>
                <a name={'sentence-block-' + this.props.sentence.sentence_id}></a>
                <div className="sentence">
                    <label className={sentenceLabelClass}>Zin {this.props.sentence.number}:</label>{'  '}
                    <span className="sentence-text">
                        <i>{this.props.sentence.text}</i>
                    </span>
                </div>
                <div className="sentence-answerable">
                    {answerable}
                </div>
                <div className="sentence-questions">
                    {questionList}
                </div>
            </div>
        )
    }
}

export default SentenceQuestions;


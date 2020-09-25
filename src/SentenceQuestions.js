
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LikertButton from './buttons/LikertButton.js';
import CategoryButton from './buttons/CategoryButton.js';
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
            // if only likert questions, use a table
            asTable: this.props.questions.every(question => { return question.answerType === 'likert'})
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
        //console.log("clearing responses");
        this.setState({response: {unanswerable: false, no_impact: false}});
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
            sentenceResponse["humor_scale"] = "0";
        }
        if (sentenceResponse["narrative_scale"] !== "0" && sentenceResponse["emotional_scale"] === "0") {
            window.alert(this.props.boilerplate.alert.narrative_no_emo);
            sentenceResponse["narrative_scale"] = "0";
        }
        if (sentenceResponse["style_scale"] !== "0" && sentenceResponse["emotional_scale"] === "0") {
            window.alert(this.props.boilerplate.alert.style_no_emo);
            sentenceResponse["style_scale"] = "0";
        }
        if (sentenceResponse["humor_scale"] !== "0" && sentenceResponse["emotional_scale"] === "0") {
            window.alert(this.props.boilerplate.alert.valence_no_emo);
            sentenceResponse["humor_scale"] = "0";
        }
        if (FormActions.checkResponseDone(sentenceResponse, this.props.questions)) {
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
        console.log(this.state.asTable)
        let showQuestions = (!this.state.response.unanswerable && !this.state.response.no_impact);
        console.log('showQuestions:', showQuestions)
        if (!this.state.response || !showQuestions) {
            return null;
            // return (this.state.asTable) ? (<></div>) : (<div></div>)
        }
        let component = this;
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
            let button = makeLikertButton(question, value);
            if (this.state.asTable) {
                return (<td key={'likert-' + value}>{button}</td>)
            } else {
                return button;
            }
        });
        var categoryButtons = question.labels.map(value => {
            return makeCategoryButton(question, value);
        });
        var makeButtons = question => {
            if (this.state.asTable && question.answerType === "likert") {
                // if presented in a table, just return the buttons to be placed in a cell
                return likertButtons;
            }
            if (question.answerType === "likert") {
                return (
                    <div key={question.key}>
                        <div>
                        <label>{this.props.boilerplate.response.likert_low}</label>
                        {' '}
                        {likertButtons}
                        <label>{this.props.boilerplate.response.likert_high}</label>
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
        if (this.state.asTable) {
            return (
                <tr className={"question-row sentence-" + question.questionType} key={question.key}>
                    <td className={"question-cell " + question.questionType}>
                        <span key={question.key}>{question.label}</span>
                        <span
                            className="badge term-info"
                            data-toggle="popover"
                            title={this.props.boilerplate.info.explanation}
                            data-content={question.explanation}
                            data-trigger="hover"
                        >i</span>
                    </td>
                    {buttons}
                </tr>
            )
                    //<td className="answer-cell">{buttons}</td>

        } else {
            return (
                <div className={"sentence-" + question.questionType} key={question.key}>
                    <div className="row">
                        <label key={question.key}>{question.label}</label>
                        <span
                            className="badge term-info"
                            data-toggle="popover"
                            title={this.props.boilerplate.info.explanation}
                            data-content={question.explanation}
                            data-trigger="hover"
                        >i</span>
                    </div>
                    <div>{buttons}</div>
                </div>
            )
        }
    }

    getAnswerable() {
        let response = this.state.response;
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
        this.setResponse({category: "unanswerable", "value": unanswerable});
        FormActions.checkDone
    }

    setNoImpact(event) {
        let noImpact = event.target.checked;
        let response = this.state.response;
        if (!response)
            response = {};
        response.no_impact = noImpact;
        this.setState({response: response})
        this.setResponse({category: "no_impact", "value": noImpact});
        FormActions.checkDone
    }

    makeQuestionList() {
        let questionList = this.props.questions.map(question => {
            return this.makeQuestion(question, this.props.sentence.sentence_id)
        });
        let labels = this.props.questions[0].labels;
        var likertHeaders = this.makeLikertRange().map(value => {
            return (<th>{value}</th>)
        });
        let questionTable = (
            <div className="question-table">
                <p>Rate the impact based on this sentence (0 = {labels[0]}, 4 = {labels[1]}).</p>
                <table>
                    <tbody className="question-list">
                        <tr>
                            <th></th>{likertHeaders}
                        </tr>
                        {questionList}
                    </tbody>
                </table>
            </div>
        )
        let questionBlock = (this.state.asTable) ? questionTable : questionList;
        var unanswerable = false;
        let showQuestionList = true;
        if (this.state.response && (this.state.response.unanswerable || this.state.response.no_impact)) {
            showQuestionList = false;
        }
        //if (this.state.response && showQuestionList)
        //    unanswerable = this.state.response.unanswerable;
        return (showQuestionList) ? questionBlock : (<div></div>);
    }

    render() {
        const boilerplate = this.props.boilerplate;
        let answerable = (
            <div className="sentence-unanswerable">
                <label>
                    <input
                        name={this.props.sentence.sentence_id + "-answerable"}
                        type="checkbox"
                        onChange={this.setAnswerable.bind(this)}
                        checked={this.state.response.unanswerable}
                    />
                    &nbsp;{boilerplate.question.sentence_unanswerable}&nbsp;
                    <span
                        className="badge term-info"
                        data-toggle="popover"
                        title={boilerplate.info.explanation}
                        data-content={boilerplate.question.answerable_explanation}
                        data-trigger="hover"
                    >i</span>
                </label>
            </div>
        )

        let noImpact = (
            <div className="sentence-no-impact">
                <label>
                    <input
                        name={this.props.sentence.sentence_id + "-no_impact"}
                        type="checkbox"
                        onChange={this.setNoImpact.bind(this)}
                        checked={this.state.response.noImpact}
                    />
                    &nbsp;{boilerplate.question.sentence_no_impact}&nbsp;
                    <span
                        className="badge term-info"
                        data-toggle="popover"
                        title={boilerplate.info.explanation}
                        data-content={boilerplate.question.no_impact_explanation}
                        data-trigger="hover"
                    >i</span>
                </label>
            </div>
        )

        let responseStatus = (<div></div>);
        if (this.state.responseSaved) {
            responseStatus = (<div>{boilerplate.response.saved}</div>);
        }

        let questionList = this.makeQuestionList();
        var sentenceLabelClass = "badge progress-bar-";
        let sentenceDone = FormActions.checkSentenceDone(this.props.sentence, this.props.questions);
        sentenceLabelClass += (sentenceDone) ? "success" : "danger";

        return (
            <div className="sentence-block" key={this.props.sentence.sentence_id}>
                <a name={'sentence-block-' + this.props.sentence.sentence_id}></a>
                <div className="sentence">
                    <label className={sentenceLabelClass}>{boilerplate.question.unit} {this.props.sentence.number}:</label>{'  '}
                    <span className="sentence-text">
                        <i>{this.props.sentence.text}</i>
                    </span>
                </div>
                <div className="sentence-answerable">
                    {answerable}
                </div>
                <div className="sentence-no-impact">
                    {noImpact}
                </div>
                <div className="sentence-questions">
                    {questionList}
                </div>
            </div>
        )
    }
}

export default SentenceQuestions;


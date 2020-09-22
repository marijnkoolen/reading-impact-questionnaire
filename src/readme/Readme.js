
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LoginButton from '../buttons/LoginButton.js';
import ReadmeMoreButton from '../buttons/ReadmeMoreButton.js';
import QuestionnaireButton from '../buttons/QuestionnaireButton.js';
import FormActions from '../formActions.js';

class Readme extends Component {


    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            readmeView: this.props.page
        }
        console.log('constructing')
    }

    changeView(event) {
        let nextView = event.target.name;
        if (nextView.startsWith("readme_")) {
            this.setState({readmeView: nextView})
        }
    }

    render() {
        let annotator = FormActions.getAnnotator();
        let questionnaireButton = (annotator) ?
            (<QuestionnaireButton labelText={this.props.boilerplate.button.back_to_questionnaire}/>) :
            (<LoginButton labelText={this.props.boilerplate.button.show_questionnaire}/>);
        var setDisplay = () => {
            if (this.state.readmeView === "readme_general") {
                return (<div dangerouslySetInnerHTML={{ __html: this.props.readme.general }} />)
            } else if (this.state.readmeView === "readme_impact") {
                return (<div dangerouslySetInnerHTML={{ __html: this.props.readme.impact }} />)
            } else if (this.state.readmeView === "readme_examples") {
                return (<div dangerouslySetInnerHTML={{ __html: this.props.readme.examples }} />)
            } else if (this.state.readmeView === "readme_more") {
                return (<div dangerouslySetInnerHTML={{ __html: this.props.readme.more }} />)
            } else {
                return (<div dangerouslySetInnerHTML={{ __html: this.props.readme.impact }} />)
            }
        }
        let readmeDisplay = setDisplay();
        let readmeBlocks = this.props.boilerplate.readme.pages.map(page => {
            if (page === "questionnaire") {
                return (
                    <div key={page} className="inline_div">
                        {questionnaireButton}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                );
            } else if (page === "readme_more") {
                return (
                    <div key={page} className="inline_div">
                        <a className="btn btn-primary "
                            name={page}
                            onClick={this.changeView.bind(this)}>{this.props.boilerplate.button[page]}</a>
                    </div>
                )
            } else {
                return (
                    <div key={page} className="inline_div">
                        <a className="btn btn-primary "
                            name={page}
                            onClick={this.changeView.bind(this)}>{this.props.boilerplate.button[page]}</a>
                        &nbsp;→&nbsp;
                    </div>
                )
            }
        })
        return (
            <div className="readme">
                <div className="readme-header">
                    <h1>{this.props.boilerplate.readme.title}</h1>
                    <div className="readme-navigation">
                        {readmeBlocks}
                    </div>
                </div>
                <div className="readme-explanation">
                    {readmeDisplay}
                </div>
            </div>
        );
    }
}

export default Readme;



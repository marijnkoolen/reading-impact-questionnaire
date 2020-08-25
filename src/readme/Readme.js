
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReadmeGeneral from './ReadmeGeneral.js';
import ReadmeMore from './ReadmeMore.js';
import ReadmeImpact from './ReadmeImpact.js';
import ReadmeExamples from './ReadmeExamples.js';
import LoginButton from '../buttons/LoginButton.js';
import ReadmeMoreButton from '../buttons/ReadmeMoreButton.js';
import QuestionnaireButton from '../buttons/QuestionnaireButton.js';
import FormActions from '../formActions.js';

class Readme extends Component {


    constructor(props) {
        super(props);
        this.state = {
            readmeView: "readme-general"
        }
    }

    changeView(event) {
        let nextView = event.target.name;
        if (nextView.startsWith("readme-")) {
            this.setState({readmeView: nextView})
        }
    }

    render() {
        let annotator = FormActions.getAnnotator();
        let nextButton = (annotator) ?
            (<QuestionnaireButton labelText={this.props.boilerplate.button.back_to_questionnaire}/>) :
            (<LoginButton labelText={this.props.boilerplate.questionnaire}/>);
        var setDisplay = () => {
            if (this.state.readmeView === "readme-general") {
                return (<div dangerouslySetInnerHTML={{ __html: this.props.readme.general }} />)
            } else if (this.state.readmeView === "readme-impact") {
                return (<div dangerouslySetInnerHTML={{ __html: this.props.readme.impact }} />)
            } else if (this.state.readmeView === "readme-examples") {
                return (<div dangerouslySetInnerHTML={{ __html: this.props.readme.examples }} />)
            } else if (this.state.readmeView === "readme-more") {
                return (<div dangerouslySetInnerHTML={{ __html: this.props.readme.more }} />)
            } else {
                return null;
            }
        }
        let readmeDisplay = setDisplay();
        return (
            <div className="readme">
                <div className="readme-header">
                    <h1>Beoordelen van Impact van Lezen in Boekrecensies</h1>
                    <div className="readme-navigation">
                        <a className="btn btn-primary "
                            name="readme-general"
                            onClick={this.changeView.bind(this)}>Algemene uitleg</a>
                        &nbsp;→&nbsp;
                        <a className="btn btn-primary "
                            name="readme-impact"
                            onClick={this.changeView.bind(this)}>Impact uitleg</a>
                        &nbsp;→&nbsp;
                        <a className="btn btn-primary "
                            name="readme-examples"
                            onClick={this.changeView.bind(this)}>Impact voorbeelden</a>
                        &nbsp;→&nbsp;
                        {nextButton}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="btn btn-primary "
                            name="readme-more"
                            onClick={this.changeView.bind(this)}>Meer informatie</a>
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



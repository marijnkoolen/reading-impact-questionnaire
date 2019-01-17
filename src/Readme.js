﻿
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LoginButton from './LoginButton.js';
import ReadmeGeneral from './ReadmeGeneral.js';
import ReadmeMore from './ReadmeMore.js';
import ReadmeImpact from './ReadmeImpact.js';
import ReadmeExamples from './ReadmeExamples.js';
import ReadmeMoreButton from './ReadmeMoreButton.js';
import QuestionnaireButton from './QuestionnaireButton.js';
import FormActions from './formActions.js';

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
        console.log(nextView);
        /*
        if (nextView === "readme-more") {
            this.props.changeView("readme-more");
       }
       */
    }

    render() {
        let annotator = FormActions.getAnnotator();
        let nextButton = (annotator) ?
            (<QuestionnaireButton labelText="Terug naar de vragenlijst"/>) :
            (<LoginButton labelText="Naar de vragenlijst"/>);
        var setDisplay = () => {
            if (this.state.readmeView === "readme-general") {
                return (<ReadmeGeneral/>);
            } else if (this.state.readmeView === "readme-impact") {
                return (<ReadmeImpact/>);
            } else if (this.state.readmeView === "readme-examples") {
                return (<ReadmeExamples/>);
            } else if (this.state.readmeView === "readme-more") {
                return (<ReadmeMore/>);
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



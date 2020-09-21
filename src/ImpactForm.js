
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';
import Login from './Login.js';
import Readme from './readme/Readme.js';
import Questionnaire from './Questionnaire.js';
import AllJudgements from './AllJudgements.js';
import ThankYou from './ThankYou.js';
import AppFormStore from './formStore.js';

class ImpactForm extends Component {
    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
        this.state = {
            view: "readme",
            page: "readme_general"
        }
    }

    componentDidMount() {
        AppFormStore.bind('change-view', this.changeView.bind(this));
        FormActions.setSentenceServer(this.props.apiUrl);
        this.setView();
    }

    componentWillUnmount() {
        AppFormStore.unbind('change-view', this.changeView.bind(this));
    }

    changeView(view) {
        if (this.state.view === "judgements" && view === "questionnaire") {
            //console.log("remove and load new sentences");
            if (FormActions.isDispatching()) {
                setTimeout(FormActions.loadNewSentences, 100)
            } else {
                FormActions.loadNewSentences();
            }
        }
        window.localStorage.setItem("view", view);
        this.setState({view: view});
    }

    setView() {
        let view = window.localStorage.getItem("view");
        if (view)
            this.setState({view: view, page: "readme_impact"});
    }

    render() {
        let questionnaire = (
            <Questionnaire boilerplate={this.props.boilerplate}/>
        );

        let judgements = (
            <AllJudgements boilerplate={this.props.boilerplate}/>
        );

        let login = (
            <Login boilerplate={this.props.boilerplate}/>
        )

        let readme = (
            <Readme readme={this.props.readme} page={this.state.page} boilerplate={this.props.boilerplate}/>
        )

        let thankyou = (
            <ThankYou boilerplate={this.props.boilerplate}/>
        )

        var view = null;
        if (this.state.view === "readme")
            view = readme;
        else if (this.state.view === "login")
            view = login;
        else if (this.state.view === "thankyou")
            view = thankyou;
        else if (this.state.view === "questionnaire")
            view = questionnaire;
        else if (this.state.view === "judgements")
            view = judgements;
        else if (this.state.view === "thankyou")
            view = thankyou;

        return (
            <div className="container">
                <div className="row top">
                    <div className="col-md-12 col-xs-12">
                        <div className="logo">
                            <a href="https://huc.knaw.nl/">
                                <img src="/images/logo-knaw-humanities-cluster.png"  className="logo" />
                            </a>
                            <a href="https://www.huygens.knaw.nl/">
                                <img src="/images/huygens_ing.jpg"  className="logo" />
                            </a>
                            <a href="https://www.hebban.nl/">
                                <img src="/images/hebbanlogo_2016_web_roze.png"  className="logo" />
                            </a>
                        </div>
                        {view}
                    </div>
                </div>
            </div>
        )
    }
}

export default ImpactForm;


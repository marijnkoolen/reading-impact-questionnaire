
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';
import Login from './Login.js';
import Readme from './Readme.js';
import Questionnaire from './Questionnaire.js';
import AllJudgements from './AllJudgements.js';
import ThankYou from './ThankYou.js';
import AppFormStore from './formStore.js';

class ImpactForm extends Component {
    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
        this.state = {
            view: "readme"
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
        window.localStorage.setItem("view", view);
        this.setState({view: view});
    }

    setView() {
        let view = window.localStorage.getItem("view");
        if (view)
            this.setState({view: view});
    }

    render() {
        let questionnaire = (
            <Questionnaire/>
        );

        let judgements = (
            <AllJudgements/>
        );

        let login = (
            <Login/>
        )

        let readme = (
            <Readme/>
        )

        let thankyou = (
            <ThankYou/>
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
            <div className="row top">
                <div className="col-md-2">
                </div>
                <div className="col-md-10">
                    <div className="logo">
                        <a href="https://huc.knaw.nl/">
                            <img src="/images/logo-knaw-humanities-cluster.png"  className="logo" />
                        </a>
                        <a href="https://www.huygens.knaw.nl/">
                            <img src="/images/huygens_ing.jpg"  className="logo" />
                        </a>
                    </div>
                    {view}
                </div>
            </div>
        )
    }
}

export default ImpactForm;


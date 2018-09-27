
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';
import Login from './Login.js';
import DoneButton from './DoneButton.js';
import Readme from './Readme.js';
import Questionnaire from './Questionnaire.js';
import ThankYou from './ThankYou.js';
import SentenceQuestions from './SentenceQuestions.js';
import SentenceAPI from './sentenceAPI.js';
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

        let login = (
            <Login/>
        )

        let readme = (
            <div className="col-md-10">
                <Readme/>
            </div>
        )

        let thankyou = (
            <div className="col-md-10">
                <ThankYou/>
            </div>
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
        else if (this.state.view === "thankyou")
            view = thankyou;

        return (
            <div className="row top">
                <div className="col-md-2">
                    <div className="logo">
                        <img src="https://huc.jauco.nl/wp-content/themes/huc2018/images/logo-knaw-humanities-cluster.png"  className="logo" />
                    </div>
                    <div className="logo">
                        <img src="/images/huygens_ing.jpg"  className="logo" />
                    </div>
                </div>
                <div className="col-md-10">
                    {view}
                </div>
            </div>
        )
    }
}

export default ImpactForm;


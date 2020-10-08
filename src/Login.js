
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReadmeButton from './buttons/ReadmeButton.js';
import FormActions from './formActions.js';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identifier: ''
        }
    }

    changeView() {
        this.props.changeView("questionnaire");
    }

    handleIdChange(event) {
        this.setState({identifier: event.target.value})
    }

    submitTypeId() {
        let component = this;
        if (FormActions.checkIdIsValid(this.state.identifier)) {
            FormActions.checkIdExists(this.state.identifier, (exists) => {
                if (exists) {
                    this.handleLogin(this.state.identifier);
                    FormActions.addNewId(this.state.identifier);
                    return false;
                } else {
                    window.alert(component.props.boilerplate.login.unused_id);
                }
            });
        } else {
            window.alert(component.props.boilerplate.login.invalid_id);
        }
    }

    handleLogin(identifier) {
        FormActions.setAnnotator(identifier);
        FormActions.changeView("questionnaire");
    }

    submitExistingId(event) {
        let identifier = event.target.name;
        this.handleLogin(identifier);
    }

    generateID() {
        let identifier = FormActions.generateID();
        this.handleLogin(identifier);
        FormActions.addNewId(identifier);
    }

    render() {
        let previousIds = FormActions.getPreviousIds();
        let idList = previousIds.map((identifier) => {
            return (
                <span
                    key={identifier}
                >
                <button
                    className="btn btn-primary"
                    key={identifier}
                    name={identifier}
                    onClick={this.submitExistingId.bind(this)}
                >
                    {this.props.boilerplate.login.login_with_id} {identifier}
                </button>
                {' '}
                </span>
            );
        });

        let previous = (previousIds.length === 0) ? null : (
            <div className="login-type">
                <span>{this.props.boilerplate.login.reuse_id}:</span>
                <div>{idList}</div>
            </div>
        );
        let typedId = (
                <div className="login-type">
                    <span>{this.props.boilerplate.login.enter_id}</span>
                    <input
                        type="text"
                        name="typedId"
                        value={this.state.typedId}
                        onChange={this.handleIdChange.bind(this)}
                        autoCapitalize="none"
                    />
                    {' '}
                    <button
                        className="btn btn-primary"
                        onClick={this.submitTypeId.bind(this)}
                    >
                        {this.props.boilerplate.login.login_with_this}
                    </button>
                </div>
        )
        let generateNewIdButton = (
                    <button
                        className="btn btn-primary"
                        onClick={this.generateID.bind(this)}
                        >
                            {this.props.boilerplate.login.login_with_new}
                    </button>
        )
        let generateNewId = (
            <div className="login-type">
                <p>{this.props.boilerplate.login.new_id}</p>
                <span>
                    {generateNewIdButton}
                </span>
            </div>
        )

        const nl_login = (
            <div>
                <div className="login">
                    <h2>Aanmelden</h2>
                    {previous}
                    {generateNewId}
                    {typedId}
                </div>
                <span className="author-info">
                </span>
                <div className="explanation">
                    <h3>Welke gegevens verzamelen we?</h3>
                    <p>
                        We willen geen persoonlijk identificeerbare informatie opslaan, dus ook geen IP adressen. Om u aan te melden kunt u een nieuw ID laten generen. Dit is een code van 3 letters en 3 cijfers die we samen met uw oordelen opslaan. We doen dit alleen om antwoorden van verschillende deelnemers uit elkaar te kunnen houden, zodat u niet twee keer dezelfde zinnen krijgt voorgelegd.
                    </p>
                    <h3>Wanneer moet ik een bestaand ID invoeren?</h3>
                    <p>
                        Dit is alleen nodig als u de enquête op meerdere devices wilt gebruiken (PC, telefoon, tablet, etc.). Schrijf in dat geval uw ID op en hergebruik het voor alle devices. Dan zorgt de applicatie ervoor dat u verder kunt gaan waar u gebleven was op een ander device, en eerdere antwoorden inzien.
                    </p>
                    <p>
                        Als u aangemeld bent, slaat uw browser automatisch het ID op in de lokale browseropslag op het apparaat dat u gebruikt. Als op een later moment weer terugkeert naar deze site, wordt u automatisch aangemeld met het opgeslagen ID. U kunt eerder gegeven antwoorden altijd inzien zolang u bent aangemeld met uw ID.
                    </p>
                </div>
                <div className="closing">
                    <ReadmeButton labelText={this.props.boilerplate.button.back_to_explanation}/>
                </div>
            </div>
        );

        const en_login = (
            <div>
                <div className="login">
                    <h2>Participating</h2>
                    <p>You can participate without providing any personal information.</p>
                    <p>If you have already participated, please reuse the token you 
                        were given before, so we can avoid giving you sentences you have already judged.</p>
                    {previous}
                    {generateNewId}
                    {typedId}
                </div>
                <span className="author-info">
                </span>
                <div className="explanation">
                    <h3>What data do we collect?</h3>
                    <p>
                        We don't collect personal information, unless you provide it at the end because you want us to 
                        keep you informed about the results of the questionnaire.
                        When you participate, you will be given a randomly generated and anonymous token. 
                        The sole purpose of this token is to keep track of which sentences you have judged before, 
                        so you don't receive the same sentence twice. 
                    </p>
                    <p>
                        We store your responses to the questionnaire on a secure server at the Humanities Cluster. 
                        These responses will only be used to validate our computational model and will not be shared with 
                        third parties. The data will be kept for five years, conforming to standard research data 
                        management protocol, to ensure transparency and reproducibility of our research. 
                    </p>
                    <h3>When do I have to fill in an existing token?</h3>
                    <p>
                        This is only necessary when you use multiple devices to participate (desktop, laptop, tablet, etc.). 
                        In that case, please write down the token (three letters and three digits) and reuse it on all devices. 
                    </p>
                    <p>
                        When you participate, your browser automatically stores the token locally on your device. If you 
                        return at a later time, the browser loads the token from your device so you can easily continue
                        with the questionnaire and review all your responses.
                    </p>
                </div>
                <div className="closing">
                    <ReadmeButton labelText={this.props.boilerplate.button.back_to_explanation}/>
                    {' '}
                    {idList}
                    {' '}
                    {generateNewIdButton}
                </div>
            </div>

        )

        return (
            <div>
                {(this.props.boilerplate.version == "nl_2019") ? nl_login : en_login}
            </div>
        )
    }
}

export default Login;


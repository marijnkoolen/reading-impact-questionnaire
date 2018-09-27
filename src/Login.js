
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReadmeButton from './ReadmeButton.js';
import FormActions from './formActions.js';

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    changeView() {
        this.props.changeView("questionnaire");
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
                <button
                    className="btn btn-primary"
                    key={identifier}
                    name={identifier}
                    onClick={this.submitExistingId.bind(this)}
                >
                    {identifier}
                </button>
            );
        });
        let previous = (previousIds.length === 0) ? null : (
            <div>
                <span>U bent eerder aangemeld met ID:</span>
                <ul>
                    {idList}
                </ul>
            </div>
        )
        let generateNewId = (
            <span>
                <button
                    className="btn btn-primary"
                    onClick={this.generateID.bind(this)}
                    >
                    Aanmelden met nieuw ID
                </button>
            </span>
        )

       return (
            <div>
                <div className="login">
                    <h2>Aanmelden</h2>
                    {previous}
                    <p>Als u nog niet eerder bent aangemeld, of u bent uw ID kwijt, genereer dan een nieuw ID om u aan te melden.</p>
                </div>
                <span className="author-info">
                    {generateNewId}
                </span>
                <div className="explanation">
                    <h3>Welke gegevens verzamelen we?</h3>
                    <p>
                        We willen geen persoonlijk identificeerbare informatie opslaan. Om u aan te melden kunt u een nieuw ID laten generen. Dit is een code van 3 letters en 3 cijfers die we samen met uw oordelen opslaan om te bepalen welke zinnen u al heeft beoordeeld, zodat u niet twee keer dezelfde zinnen beoordeeld, en om antwoorden van verschillende deelnemers uit elkaar te kunnen houden. We slaan ook geen IP-adres op.
                    </p>
                    <h3>Moet ik het ID steeds opnieuw invoeren?</h3>
                    <p>
                        Als u aangemeld bent, slaat uw browser automatisch het ID op in de lokale browser opslag op het apparaat dat u gebruikt. Als op een later moment weer terugkeert naar deze site, wordt u automatisch aangemeld met het opgeslagen ID. U kunt eerder gegeven antwoorden altijd inzien zolang u bent aangemeld met uw ID.
                    </p>
                    <p><strong>Meerdere devices gebruiken:</strong> Als u meerdere devices wilt gebruiken, schrijf dan uw ID op en hergebruik op andere devices. Dan zorgt de applicatie ervoor dat u verder kunt gaan waar u gebleven was en eerdere antwoorden inzien.
                    </p>
                </div>
                <div className="closing">
                    <ReadmeButton labelText="Terug naar de uitleg"/>
                </div>
            </div>
        )
    }
}

export default Login;


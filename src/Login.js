
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReadmeButton from './ReadmeButton.js';
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
        if (FormActions.checkIdIsValid(this.state.identifier)) {
            FormActions.checkIdExists(this.state.identifier, (exists) => {
                if (exists) {
                    this.handleLogin(this.state.identifier);
                    return false;
                } else {
                    window.alert('Dit ID is niet in gebruik!');
                }
            });
        } else {
            window.alert('Dit is geen geldig ID. Een geldig ID heeft drie letters gevolgd door drie cijfers');
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
                    Aanmelden met ID {identifier}
                </button>
                {' '}
                </span>
            );
        });

        let previous = (previousIds.length === 0) ? null : (
            <div className="login-type">
                <span>U kunt u aanmelden met een eerder gebruikt ID:</span>
                <div>{idList}</div>
            </div>
        );
        let typedId = (
                <div className="login-type">
                    <span>Als u eerder al via een ander device bent aangemeld, kunt u uw ID hier invoeren: </span>
                    <input
                        type="text"
                        name="typedId"
                        value={this.state.typedId}
                        onChange={this.handleIdChange.bind(this)}
                    />
                    {' '}
                    <button
                        className="btn btn-primary"
                        onClick={this.submitTypeId.bind(this)}
                    >
                        Aanmelden met dit ID
                    </button>
                </div>
        )
        let generateNewId = (
            <div className="login-type">
                <p>Als u nog niet eerder bent aangemeld, of u bent uw ID kwijt, genereer dan een nieuw ID om u aan te melden.</p>
                <span>
                    <button
                        className="btn btn-primary"
                        onClick={this.generateID.bind(this)}
                        >
                        Aanmelden met nieuw ID
                    </button>
                </span>
            </div>
        )

       return (
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
                        We willen geen persoonlijk identificeerbare informatie opslaan. Om u aan te melden kunt u een nieuw ID laten generen. Dit is een code van 3 letters en 3 cijfers die we samen met uw oordelen opslaan om te bepalen welke zinnen u al heeft beoordeeld, zodat u niet twee keer dezelfde zinnen beoordeeld, en om antwoorden van verschillende deelnemers uit elkaar te kunnen houden. We slaan ook geen IP-adres op.
                    </p>
                    <h3>Wanneer moet ik een bestaand ID invoeren?</h3>
                    <p>
                        Dit is alleen nodig als u meerdere devices wilt gebruiken. Schrijf in dat geval uw ID op en hergebruik het voor alle devices. Dan zorgt de applicatie ervoor dat u verder kunt gaan waar u gebleven was op een ander device, en eerdere antwoorden inzien.
                    </p>
                    <p>
                        Als u aangemeld bent, slaat uw browser automatisch het ID op in de lokale browser opslag op het apparaat dat u gebruikt. Als op een later moment weer terugkeert naar deze site, wordt u automatisch aangemeld met het opgeslagen ID. U kunt eerder gegeven antwoorden altijd inzien zolang u bent aangemeld met uw ID.
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


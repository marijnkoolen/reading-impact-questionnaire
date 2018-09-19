
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ThankYou extends Component {

    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
    }

    changeView(event) {
        let view = event.target.name;
        this.props.changeView(view);
    }

    render() {
        return (
            <div className="thankyou">
                <h2>
                    Hartelijk dank voor uw medewerking!
                </h2>
                <p>
                    Als u op de hoogte gehouden wilt worden over de vorderingen van dit onderzoek, laat het ons weten. Mail naar ...
                </p>
                <div className="closing">
                    <button
                        className="btn btn-primary"
                        name="readme"
                        onClick={this.changeView.bind(this)}
                    >
                        Terug naar de uitleg
                    </button>
                    {' '}
                    <button
                        className="btn btn-primary"
                        name="questionnaire"
                        onClick={this.changeView.bind(this)}
                    >
                        Terug naar de vragen
                    </button>
                </div>
            </div>
        )
    }
}

export default ThankYou;

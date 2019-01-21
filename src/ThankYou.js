
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReadmeButton from './ReadmeButton.js';
import LoginButton from './LoginButton.js';
import CommentBox from './CommentBox.js';
import AppFormStore from './formStore.js';

class ThankYou extends Component {

    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
        this.state = {
            previousId: null
        }
    }

    changeView(event) {
        let view = event.target.name;
        this.props.changeView(view);
    }

    loadNewSentences() {
        FormActions.loadNewSentences();
        this.props.changeView("questionnaire");
    }

    render() {
        return (
            <div className="thankyou">
                <h2>
                    Hartelijk dank voor uw medewerking!
                </h2>
                <p>
                    Als u op de hoogte gehouden wilt worden over de vorderingen van dit onderzoek, laat het ons weten. Mail naar <a href="mailto:peter.boot@huygens.knaw.nl">peter.boot@huygens.knaw.nl</a> en/of <a href="mailto:marijn.koolen@di.huc.knaw.nl">marijn.koolen@di.huc.knaw.nl</a>.
                </p>
                <div className="closing">
                    <CommentBox/>
                    <ReadmeButton labelText="Terug naar de uitleg"/>
                    {' '}
                    <LoginButton labelText="Opnieuw aanmelden"/>
                </div>
            </div>
        )
    }
}

export default ThankYou;

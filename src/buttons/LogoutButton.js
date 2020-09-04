
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from '../formActions.js';

class LogoutButton extends Component {

    constructor(props) {
        super(props);
    }

    logout() {
        FormActions.removeAnnotator();
        FormActions.changeView("thankyou");
    }

    render() {
        return (
            <button
                className="btn btn-primary"
                onClick={this.logout.bind(this)}
            >
                {this.props.labelText}
            </button>
        )
    }
}

export default LogoutButton;

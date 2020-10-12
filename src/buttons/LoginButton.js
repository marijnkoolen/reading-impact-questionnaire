
"use strict"

import React, {Component} from 'react';
import FormActions from '../formActions.js';

class LoginButton extends Component {

    constructor(props) {
        super(props);
    }

    changeView() {
        FormActions.changeView("login");
    }

    render() {
        let labelText = (this.props.labelText) ? this.props.labelText : "Aanmelden";
        return (
            <button
                className="btn btn-primary"
                onClick={this.changeView.bind(this)}
            >
                {labelText}
            </button>
        )
    }
}

export default LoginButton;


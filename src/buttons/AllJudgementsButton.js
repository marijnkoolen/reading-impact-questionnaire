
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from '../formActions.js';

class AllJudgementsButton extends Component {

    constructor(props) {
        super(props);
    }

    changeView() {
        FormActions.changeView("judgements");
    }

    render() {
        let labelText = (this.props.labelText) ? this.props.labelText : "Toon al mijn beoordelingen";
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

export default AllJudgementsButton;



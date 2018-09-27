
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';

class ReadmeMoreButton extends Component {

    constructor(props) {
        super(props);
    }

    changeView() {
        // TO DO: implement readme-more page
        //FormActions.changeView("readme-more");
    }

    render() {
        return (
            <button
                className="btn btn-primary"
                onClick={this.changeView.bind(this)}
            >
                Uitgebreidere uitleg
            </button>
        )
    }
}

export default ReadmeMoreButton;



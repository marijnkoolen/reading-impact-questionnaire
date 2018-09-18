
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';

class LikertButton extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    handleChange(event) {
        let response = {
            category: this.props.impactType,
            value: event.target.value
        };
        this.props.setResponse(response);
    }

    render() {
        return (
            <label key={this.props.value}>
                <input
                    name={this.props.name}
                    type="radio"
                    value={this.props.value}
                    checked={this.props.selected}
                    onChange={this.handleChange.bind(this)}
                />{' '}
            </label>
        )
    }
}

export default LikertButton;

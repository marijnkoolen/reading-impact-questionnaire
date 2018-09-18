
"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';

class CategoryButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
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
            <div key={this.props.value}>
                <label>
                    <input
                        name={this.props.name}
                        type="radio"
                        value={this.props.value}
                        checked={this.props.selected}
                        onChange={this.handleChange.bind(this)}
                    />{' '}
                    {this.props.label}
                </label>
            </div>
        )
    }
}

export default CategoryButton;


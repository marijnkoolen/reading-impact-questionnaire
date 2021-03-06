
"use strict"

import React, {Component} from 'react';

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
            <input
                key={this.props.value}
                className="likert-button"
                name={this.props.name}
                type="radio"
                value={this.props.value}
                checked={this.props.selected}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}

export default LikertButton;


"use strict"

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormActions from './formActions.js';

class CommentBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            feedback: ''
        }
    }

    noComment() {
        return this.state.comment === '';
    }

    submitComment() {
        FormActions.sendComment(this.state.comment);
        var feedback = "Dank voor uw opmerkingen!"
        this.setState({comment: "", feedback: feedback});
    }

    handleCommentChange(event) {
        let comment = event.target.value;
        this.setState({comment: comment});
    }

    render() {
       return (
            <div>
                <div className="comment-box">
                    <h3>Opmerkingen</h3>
                    <p>Als u opmerkingen heeft over de vragenlijst of het invullen daarvan, kunt u deze hier invullen.</p>
                    <textarea
                        type="text"
                        name="comment"
                        rows="5"
                        cols="80"
                        value={this.state.comment}
                        onChange={this.handleCommentChange.bind(this)}
                    />
                    {' '}
                    <button
                        className="btn btn-primary"
                        disabled={this.state.comment === ''}
                        onClick={this.submitComment.bind(this)}
                    >
                        Opmerkingen versturen
                    </button>
                    <div className="comment-feedback">
                        {this.state.feedback}
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentBox;



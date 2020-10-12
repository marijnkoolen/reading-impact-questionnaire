
"use strict"

import React from 'react';
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
        this.setState({comment: "", feedback: this.props.boilerplate.comment.feedback});
    }

    handleCommentChange(event) {
        let comment = event.target.value;
        this.setState({comment: comment});
    }

    render() {
        return (
            <div>
                <div className="comment-box">
                    <h3>{this.props.boilerplate.comment.title}</h3>
                    <p>{this.props.boilerplate.comment.box}</p>
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
                        {this.props.boilerplate.button.comment}
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



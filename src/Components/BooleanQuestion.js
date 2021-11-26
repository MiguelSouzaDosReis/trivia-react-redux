/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

class BooleanQuestion extends Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const { answered } = this.props;
    document.querySelector('[data-testid=correct-answer]').classList.add('correct');
    document.querySelector('[data-testid=wrong-answer-0]').classList.add('incorrect');
    answered();
  }

  sanitize(dirty) {
    const defaultOptions = {
      allowedTags: ['button', 'span', 'p', 'div'],
    };
    const test = (text, options) => ({
      __html: sanitizeHtml(
        text,
        { ...options },
      ),
    });
    return test(dirty, defaultOptions);
  }

  render() {
    const { currentQuestion } = this.props;
    const { correct_answer: correctAnswer,
      category, question } = currentQuestion;
    return (
      <div>
        <span
          data-testid="question-category"
          dangerouslySetInnerHTML={ this.sanitize(category) }
        />
        <p
          data-testid="question-text"
          dangerouslySetInnerHTML={ this.sanitize(question) }
        />
        <button
          type="button"
          data-testid={ correctAnswer === 'True' ? 'correct-answer' : 'wrong-answer-0' }
          onClick={ this.handleButtonClick }
        >
          True
        </button>
        <button
          type="button"
          data-testid={ correctAnswer === 'False' ? 'correct-answer' : 'wrong-answer-0' }
          onClick={ this.handleButtonClick }
        >
          False
        </button>
      </div>
    );
  }
}

BooleanQuestion.propTypes = {
  currentQuestion: PropTypes.shape({
    question: PropTypes.string,
    category: PropTypes.string,
    correct_answer: PropTypes.string,
  }).isRequired,
  answered: PropTypes.func.isRequired,
};

export default BooleanQuestion;

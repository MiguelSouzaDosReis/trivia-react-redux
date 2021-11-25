import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BooleanQuestion extends Component {
  handleButtonClick() {
    const { answered } = this.props;
    answered();
  }

  render() {
    const { currentQuestion } = this.props;
    const { correct_answer: correctAnswer,
      category, question } = currentQuestion;
    return (
      <div>
        <span data-testid="question-category">{category}</span>
        <p data-testid="question-text">{question}</p>
        <button
          type="button"
          data-testid={ correctAnswer === 'True' ? 'correct-answer' : 'wrong-answer-0' }
        >
          True
        </button>
        <button
          type="button"
          data-testid={ correctAnswer === 'False' ? 'correct-answer' : 'wrong-answer-0' }
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

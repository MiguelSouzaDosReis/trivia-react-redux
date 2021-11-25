import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MultipleQuestion extends Component {
  constructor(props) {
    super(props);

    const { currentQuestion } = props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = currentQuestion;

    this.testeidIndex = -1;
    this.factor = 0.5;

    this.answers = [...incorrectAnswers, correctAnswer];
    this.answers.sort(() => Math.random() - this.factor);

    this.getTestidIndex = this.getTestidIndex.bind(this);
    this.getAnswersButtons = this.getAnswersButtons.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  getTestidIndex() {
    this.testeidIndex += 1;
    return `wrong-answer-${this.testeidIndex}`;
  }

  getAnswersButtons() {
    const { currentQuestion } = this.props;
    const { correct_answer: correctAnswer } = currentQuestion;

    return this.answers.map((answer, index) => (
      <button
        key={ index }
        type="button"
        onClick={ this.handleButtonClick }
        data-testid={ answer === correctAnswer
          ? 'correct-answer'
          : this.getTestidIndex() }
      >
        { answer }
      </button>
    ));
  }

  handleButtonClick() {
    const { answered } = this.props;
    answered();
  }

  render() {
    const { currentQuestion } = this.props;
    const { category, question } = currentQuestion;

    return (
      <div>
        <span data-testid="question-category">{category}</span>
        <p data-testid="question-text">{question}</p>
        { this.getAnswersButtons() }
      </div>
    );
  }
}

MultipleQuestion.propTypes = {
  currentQuestion: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  answered: PropTypes.func.isRequired,
};

export default MultipleQuestion;

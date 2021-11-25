/* eslint-disable react/prop-types */
import React, { Component } from 'react';

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
        data-testid={ answer === correctAnswer
          ? 'correct-answer'
          : this.getTestidIndex() }
      >
        { answer }
      </button>
    ));
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

export default MultipleQuestion;

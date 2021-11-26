/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

class MultipleQuestion extends Component {
  constructor(props) {
    super(props);

    this.testeidIndex = -1;

    this.getTestidIndex = this.getTestidIndex.bind(this);
    this.getAnswersButtons = this.getAnswersButtons.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.createSortedArray = this.createSortedArray.bind(this);

    this.state = {
      sortedArray: [],
    };
  }

  getTestidIndex() {
    this.testeidIndex += 1;
    const testIndex = this.testeidIndex;
    const result = `wrong-answer-${testIndex}`;
    if (this.testeidIndex === 2) this.testeidIndex = -1;
    return result;
  }

  getAnswersButtons() {
    this.createSortedArray();
    const { sortedArray } = this.state;
    const { currentQuestion, timerValue } = this.props;
    const {
      correct_answer: correctAnswer,
    } = currentQuestion;
    return sortedArray.map((answer, index) => (
      <button
        key={ index }
        type="button"
        onClick={ this.handleButtonClick }
        data-testid={ answer === correctAnswer
          ? 'correct-answer'
          : this.getTestidIndex() }
        aria-label={ answer === correctAnswer
          ? 'correct-answer'
          : this.getTestidIndex() }
        dangerouslySetInnerHTML={ this.sanitize(answer) }
        htmlFor="a"
        disabled={ timerValue === 0 }
      />
    ));
  }

  createSortedArray() {
    const { sortedArray } = this.state;
    const { currentQuestion } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = currentQuestion;
    const factor = 0.5;
    const answers = [...incorrectAnswers, correctAnswer];
    const isTheSameAnswers = sortedArray.some((ans) => ans === answers[0]);
    if ((sortedArray.length > 0 && !isTheSameAnswers) || sortedArray.length === 0) {
      const sortedAnswers = answers.map((ans) => ans).sort(() => Math.random() - factor);
      this.setState({ sortedArray: [...sortedAnswers] });
    }
  }

  handleButtonClick() {
    const { answered, stopTimer } = this.props;
    stopTimer();
    document.querySelector('[data-testid=correct-answer]').classList.add('correct');
    document.querySelector('[data-testid=wrong-answer-0]').classList.add('incorrect');
    document.querySelector('[data-testid=wrong-answer-1]').classList.add('incorrect');
    document.querySelector('[data-testid=wrong-answer-2]').classList.add('incorrect');
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
    const { category, question } = currentQuestion;
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
  stopTimer: PropTypes.func.isRequired,
  timerValue: PropTypes.number.isRequired,
};

export default MultipleQuestion;

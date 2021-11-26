/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { getPlayer, savePlayerInfo } from '../services/localStorage';

class MultipleQuestion extends Component {
  constructor(props) {
    super(props);

    this.testeidIndex = -1;

    this.getTestidIndex = this.getTestidIndex.bind(this);
    this.getAnswersButtons = this.getAnswersButtons.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.createSortedArray = this.createSortedArray.bind(this);
    this.getQuestionValue = this.getQuestionValue.bind(this);

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
    const { currentQuestion, timerValue, isAnswered } = this.props;
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
        disabled={ timerValue === 0 || isAnswered }
      />
    ));
  }

  getQuestionValue() {
    const { currentQuestion: { difficulty }, timerValue } = this.props;
    const pointBase = 10;
    const difficultyWeight = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const questionValue = pointBase + (timerValue * difficultyWeight[difficulty]);
    return questionValue;
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

  handleButtonClick(e) {
    const { answered, stopTimer } = this.props;
    stopTimer();
    document.querySelector('[data-testid=correct-answer]').classList.add('correct');
    document.querySelector('[data-testid=wrong-answer-0]').classList.add('incorrect');
    document.querySelector('[data-testid=wrong-answer-1]').classList.add('incorrect');
    document.querySelector('[data-testid=wrong-answer-2]').classList.add('incorrect');
    const isCorrect = e.target.className === 'correct';
    if (isCorrect) {
      const currentScore = getPlayer().score;
      savePlayerInfo({ score: currentScore + this.getQuestionValue() });
      console.log(getPlayer());
      console.log(currentScore);
      console.log(this.getQuestionValue());
    }

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
    difficulty: PropTypes.string,
  }).isRequired,
  answered: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  timerValue: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired,
};

export default MultipleQuestion;

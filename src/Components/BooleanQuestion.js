/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { getPlayer, savePlayerInfo } from '../services/localStorage';

class BooleanQuestion extends Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.getQuestionValue = this.getQuestionValue.bind(this);
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

  handleButtonClick(e) {
    const { answered, stopTimer } = this.props;
    stopTimer();
    document.querySelector('[data-testid=correct-answer]').classList.add('correct');
    document.querySelector('[data-testid=wrong-answer-0]').classList.add('incorrect');
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
    const { currentQuestion, timerValue, isAnswered } = this.props;
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
          disabled={ timerValue === 0 || isAnswered }
        >
          True
        </button>
        <button
          type="button"
          data-testid={ correctAnswer === 'False' ? 'correct-answer' : 'wrong-answer-0' }
          onClick={ this.handleButtonClick }
          disabled={ timerValue === 0 || isAnswered }
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
    difficulty: PropTypes.string,
  }).isRequired,
  answered: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  timerValue: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired,
};

export default BooleanQuestion;

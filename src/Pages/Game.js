import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { fetchQuestions } from '../Redux/Actions';
import MultipleQuestion from '../Components/MultipleQuestion';
import BooleanQuestion from '../Components/BooleanQuestion';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questionIndex: 0,
      isAnswered: false,
      timerValue: 30,
    };

    this.handleNextClick = this.handleNextClick.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.showNextButton = this.showNextButton.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidMount() {
    const { getQuestions, token } = this.props;
    getQuestions(token);
    this.startTimer();
  }

  componentDidUpdate() {
    const { timerValue } = this.state;
    if (timerValue === 0) this.stopTimer();
  }

  calculateScore() {
    const { questions } = this.props;
    const { questionIndex, timerValue } = this.state;
    const { difficulty } = questions[questionIndex];
    const basePoint = 10;
    const difficultyWeight = { easy: 1, medium: 2, hard: 3 };

    const score = basePoint + (timerValue * difficultyWeight[difficulty]);

    return score;
  }

  handleNextClick() {
    const { questionIndex } = this.state;
    const { questions, history } = this.props;
    const lastIndex = 4;

    if (questionIndex === lastIndex) {
      history.push('/feedback');
      return;
    }

    this.setState((previous) => ({ questionIndex: previous.questionIndex + 1,
      isAnswered: false }));
    if (questions[questionIndex].type === 'multiple') {
      document.querySelector('[data-testid=correct-answer]').classList
        .remove('correct');
      document.querySelector('[data-testid=wrong-answer-0]').classList
        .remove('incorrect');
      document.querySelector('[data-testid=wrong-answer-1]').classList
        .remove('incorrect');
      document.querySelector('[data-testid=wrong-answer-2]').classList
        .remove('incorrect');
    }
    document.querySelector('[data-testid=correct-answer]').classList.remove('correct');
    document.querySelector('[data-testid=wrong-answer-0]').classList.remove('incorrect');
    this.setState({ timerValue: 30 }, this.startTimer());
  }

  showNextButton() {
    this.setState({ isAnswered: true });
  }

  startTimer() {
    const ONE_SECOND = 1000;
    this.Interval = setInterval(() => this
      .setState((previous) => ({ timerValue: previous.timerValue - 1 })), ONE_SECOND);
  }

  stopTimer() {
    clearInterval(this.Interval);
  }

  renderQuestions() {
    const { questions } = this.props;
    const { questionIndex, timerValue, isAnswered } = this.state;
    if (questions[questionIndex].type === 'multiple') {
      return (<MultipleQuestion
        currentQuestion={ questions[questionIndex] }
        answered={ this.showNextButton }
        stopTimer={ this.stopTimer }
        timerValue={ timerValue }
        isAnswered={ isAnswered }
        calculateScore={ this.calculateScore }
      />);
    }
    return (<BooleanQuestion
      currentQuestion={ questions[questionIndex] }
      answered={ this.showNextButton }
      stopTimer={ this.stopTimer }
      timerValue={ timerValue }
      isAnswered={ isAnswered }
      calculateScore={ this.calculateScore }
    />);
  }

  render() {
    const { questions } = this.props;
    const { timerValue, isAnswered } = this.state;
    return (
      <div>
        <Header />
        <span><strong>{timerValue}</strong></span>
        {questions.length > 0 && this.renderQuestions() }
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.handleNextClick }
          hidden={ !(isAnswered || timerValue === 0) }
        >
          Next
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    map: PropTypes.func,
    length: PropTypes.number,
    type: PropTypes.string,
  })).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

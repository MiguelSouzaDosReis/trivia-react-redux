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
    };

    this.handleNextClick = this.handleNextClick.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.showNextButton = this.showNextButton.bind(this);
  }

  componentDidMount() {
    const { getQuestions, token } = this.props;
    getQuestions(token);
  }

  componentDidUpdate() {
    this.updateQuestions();
  }

  updateQuestions() {
    const { questions, getQuestions, token } = this.props;
    const { questionIndex } = this.state;
    if (questionIndex === (questions.length - 2)) getQuestions(token);
  }

  handleNextClick() {
    this.setState((previous) => ({ questionIndex: previous.questionIndex + 1,
      isAnswered: false }));
  }

  showNextButton() {
    this.setState({ isAnswered: true });
  }

  renderQuestions() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    if (questions[questionIndex].type === 'multiple') {
      return (<MultipleQuestion
        currentQuestion={ questions[questionIndex] }
        answered={ this.showNextButton }
      />);
    }
    return (<BooleanQuestion
      currentQuestion={ questions[questionIndex] }
      answered={ this.showNextButton }
    />);
  }

  render() {
    const { questions } = this.props;
    const { isAnswered } = this.state;
    return (
      <div>
        <Header />
        {questions.length > 0 && this.renderQuestions() }
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.handleNextClick }
          hidden={ !isAnswered }
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
    category: PropTypes.string,
    question: PropTypes.string,
    map: PropTypes.func,
    length: PropTypes.number,
    type: PropTypes.string,
  })).isRequired,
  getQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

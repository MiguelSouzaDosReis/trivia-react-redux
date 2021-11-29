import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedback extends Component {
  feedback() {
    const { assertions } = this.props;
    const tres = 3;
    if (assertions < tres) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ this.feedback() }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,

});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProp)(Feedback);

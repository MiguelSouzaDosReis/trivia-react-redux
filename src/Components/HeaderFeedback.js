import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';

class Header extends Component {
  constructor() {
    super();
    this.feedback = this.feedback.bind(this);
  }

  feedback() {
    const { score } = this.props;
    const tres = 3;
    if (score < tres) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { name, score, gravatarEmail } = this.props;
    const url = `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}`;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `${url}` }
            alt="profile"
          />
          <h3 data-testid="header-player-name">
            {'Jogador: '}
            { name }
          </h3>
          <p data-testid="header-score">{ score }</p>
          <p>{ this.feedback() }</p>
        </header>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProp)(Header);

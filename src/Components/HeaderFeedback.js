import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
/* import { getPlayer } from '../services/localStorage'; */

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
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

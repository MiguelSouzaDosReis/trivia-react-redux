import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    const url = 'https://www.gravatar.com/avatar';
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `${url}` }
            alt="profile"
          />
          <h1 data-testid="header-player-name">
            { name }
          </h1>
          <p data-testid="header-score">{ score }</p>
        </header>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProp)(Header);

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTokenAct } from '../Redux/Actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      redirect: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickConfig = this.handleClickConfig.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
  }

  handleClickConfig() {
    const { history } = this.props;
    history.push('/settings');
  }

  fetchToken() {
    const { saveToken } = this.props;
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((res) => res.json()
        .then((json) => {
          saveToken(json.token);
          localStorage.setItem('token', json.token);
        }));
  }

  handleClick(e) {
    // const { history } = this.props;
    e.preventDefault(e);
    this.setState({ redirect: true });
    this.fetchToken();
    // history.push('páginaInicial');
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, email, redirect } = this.state;
    return (
      <div>
        {redirect && <Redirect to="Header" />}
        <label htmlFor="name">
          Nome:
          <input
            name="name"
            id="name"
            type="text"
            value={ name }
            onChange={ this.handleInputChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            id="email"
            type="email"
            value={ email }
            onChange={ this.handleInputChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          onClick={ (e) => this.handleClick(e) }
          disabled={ name === '' || email === '' }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClickConfig }
        >
          Configurações

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveToken: (token) => dispatch(saveTokenAct(token)),
});

export default connect(null, mapDispatchToProps)(Login);

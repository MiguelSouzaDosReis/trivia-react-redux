import React, { Component } from 'react';
import { Redirect } from 'react-router';

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
  }

  handleClick(e) {
    e.preventDefault(e);
    this.setState({ redirect: true });
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
      </div>
    );
  }
}


export default Login;

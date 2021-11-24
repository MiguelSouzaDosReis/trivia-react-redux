import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  handleClick(e) {
    e.preventDefault(e);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            name="name"
            id="name"
            type="text"
            value={ name }
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
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          onClick={ (e) => this.handleClick(e) }
          disabled={ name === '' && email === '' }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;

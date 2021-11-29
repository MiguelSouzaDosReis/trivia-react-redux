import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRanking } from '../services/localStorage';

export default class Ranking extends Component {
  tableBody() {
    return getRanking().map((a, index) => (
      <tr key={ a.score }>
        <td><img src={ a.picture } alt={ a.name } /></td>
        <td data-testid={ `player-name-${index}` }>{a.name}</td>
        <td data-testid={ `player-score-${index}` }>{a.score}</td>
      </tr>
    ));
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {this.tableBody()}
          </tbody>
        </table>
        <button
          id="go-home"
          name="go-home"
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

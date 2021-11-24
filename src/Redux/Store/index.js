import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducers';

const store = createStore(reducer, applyMiddleware(thunk));

if (window.Cypress) {
  window.store = store;
}

export default store;

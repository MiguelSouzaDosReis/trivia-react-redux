import { createStore } from 'redux';
import reducer from '../Reducers';

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

if (window.Cypress) {
  window.store = store;
}

export default store;

// import { LOGIN } from '../Actions';

import { SAVE_TOKEN } from '../Actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  ranking: [],
  token: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case LOGIN:
  //   return {
  //     ...state,
  //     player: {
  //       ...state.player,
  //       name: action.payload.name,
  //       gravatarEmail: action.payload.email,
  //     },
  //   };
  case SAVE_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default reducer;

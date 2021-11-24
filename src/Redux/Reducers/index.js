// import { LOGIN } from '../Actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  ranking: [],
  tokem: '',
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
  default:
    return state;
  }
};

export default reducer;

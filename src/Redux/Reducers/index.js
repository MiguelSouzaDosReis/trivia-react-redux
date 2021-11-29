import { GET_QUESTIONS, LOGIN, SAVE_TOKEN, UPDATE_SCORE } from '../Actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  questions: [],
  ranking: [],
  token: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.email,
      },
    };
  case SAVE_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: [...state.questions, ...action.payload.questions.results],
    };
  case UPDATE_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.payload.score,
        assertions: action.payload.assertions,
      },
    };
  default:
    return state;
  }
};

export default reducer;

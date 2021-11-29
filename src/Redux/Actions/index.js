export const LOGIN = 'LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const updateScoreAct = (score, assertions) => ({
  type: UPDATE_SCORE,
  payload: {
    score,
    assertions,
  },
});

export const loginAct = (name, email) => ({
  type: LOGIN,
  payload: {
    name,
    email,
  },
});

export const saveTokenAct = (token) => ({
  type: SAVE_TOKEN,
  payload: token,
});

const getQuestionsAct = (questions) => ({
  type: GET_QUESTIONS,
  payload: { questions },
});

export function fetchQuestions(token) {
  return (dispatch) => {
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    return fetch(endpoint)
      .then((response) => response.json())
      .then((questions) => dispatch(getQuestionsAct(questions)));
  };
}

export const LOGIN = 'LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';

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

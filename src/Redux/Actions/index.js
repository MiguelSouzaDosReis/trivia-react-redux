export const LOGIN = 'LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const login = (name, email) => ({
  type: LOGIN,
  payload: {
    name,
    email,
  },
});

export const teste1 = (teste) => ({
  teste,
});

export const saveTokenAct = (token) => ({
  type: SAVE_TOKEN,
  payload: token,
});

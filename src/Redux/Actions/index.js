export const LOGIN = 'LOGIN';

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

export function savePlayerInfo(info) {
  const state = JSON.parse(localStorage.getItem('state'));
  let newState;
  if (state === null || state === undefined) {
    newState = {
      player: {
        ...info,
      },
    };
  } else {
    newState = {
      player: {
        ...state.player,
        ...info,
      },
    };
  }
  console.log(newState);
  localStorage.setItem('state', JSON.stringify(newState));
}

export function getPlayer() {
  return JSON.parse(localStorage.getItem('state'));
}

export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  if (localStorage.getItem('token') !== null) {
    console.log(localStorage.getItem('token'));
    return (localStorage.getItem('token'));
  }
}

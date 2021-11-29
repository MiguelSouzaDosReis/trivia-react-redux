const defaultPlayerRanking = { name: '', score: 0, picture: '' };

export function getPlayer() {
  return JSON.parse(localStorage.getItem('state'));
}

// info = { name, score, assertions, gravatarEmail }

export function savePlayerInfo(info) {
  const state = getPlayer();
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
  localStorage.setItem('state', JSON.stringify(newState));
}

export function getRanking() {
  return JSON.parse(localStorage.getItem('ranking'));
}

export function addRanking(playerRanking = defaultPlayerRanking) {
  const ranking = getRanking();
  console.log(playerRanking);
  let newRanking;

  if (ranking === null || ranking === undefined) {
    newRanking = [playerRanking];
  } else {
    newRanking = [...ranking, playerRanking];
  }

  // Organiza em ordem decrescente
  newRanking.sort(({ score: a }, { score: b }) => b - a);

  localStorage.setItem('ranking', JSON.stringify(newRanking));
}

import 'regenerator-runtime/runtime';
import sortByScore from '../helpers/sortByScore';

const fetch = require('node-fetch');

const gameid = 'SM0081n4SaoYJlBFbH2S';

const uploadScore = async (name, score) => {
  const data = {
    user: name,
    score,
  };
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameid}/scores/`;
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

const getRankings = async () => {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_ID}/scores/`;
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return sortByScore(data.result);
};

export {
  uploadScore,
  getRankings,
};
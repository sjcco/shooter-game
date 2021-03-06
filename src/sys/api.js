import 'regenerator-runtime/runtime';
import sortByScore from '../helpers/sortByScore';

const fetch = require('node-fetch');

const uploadScore = async (name, score) => {
  const data = {
    user: name,
    score,
  };
  try {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_ID}/scores/`;
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
  } catch (err) {
    throw new Error('Something went wrong');
  }
};

const getRankings = async () => {
  try {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_ID}/scores/`;
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return sortByScore(data.result);
  } catch (err) {
    throw new Error('Something went wrong');
  }
};

export {
  uploadScore,
  getRankings,
};
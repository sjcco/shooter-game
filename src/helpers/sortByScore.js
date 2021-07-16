const sortByScore = (data) => data.sort((gamer1, gamer2) => gamer2.score - gamer1.score);

export default sortByScore;
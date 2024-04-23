class Match {
  constructor(homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeScore = 0;
    this.awayScore = 0;
  }

  updateScore(homeScore, awayScore) {
    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }

  get totalScore() {
    return this.homeScore + this.awayScore;
  }
}

class Scoreboard {
  constructor() {
    this.matches = [];
  }

  startMatch(homeTeam, awayTeam) {
    const match = new Match(homeTeam, awayTeam);
    this.matches.push(match);
  }

  updateMatchScore(index, homeScore, awayScore) {
    const match = this.matches[index];
    match.updateScore(homeScore, awayScore);
  }

  finishMatch(index) {
    this.matches.splice(index, 1);
  }

  getSummary() {
    const sortedMatches = this.matches.sort((a, b) => {
      if (a.totalScore === b.totalScore) {
        return this.matches.indexOf(b) - this.matches.indexOf(a);
      }
      return b.totalScore - a.totalScore;
    });

    return sortedMatches.map((match) => {
      return `${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam}`;
    });
  }
}

module.exports = {
  Scoreboard,
  Match
};

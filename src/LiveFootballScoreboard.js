import React, { useState } from "react";
const containerStyle = {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "5px",
  };
  
  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };
  
  const inputContainerStyle = {
    marginBottom: "20px",
  };
  
  const inputStyle = {
    padding: "5px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "3px",
  };
  
  const buttonStyle = {
    padding: "7px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  };
  
  const matchesContainerStyle = {
    marginBottom: "20px",
  };
  
  const matchesListStyle = {
    listStyleType: "none",
    padding: "0",
  };
  
  const matchStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "3px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
  };
  
  const finishButtonStyle = {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  };

function LiveFootballScoreboard() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [matches, setMatches] = useState([]);

  const handleStartMatch = () => {
    const newMatch = { homeTeam, awayTeam, homeScore: 0, awayScore: 0 };
    setMatches([...matches, newMatch]);
    setHomeTeam("");
    setAwayTeam("");
  };

  const handleUpdateScore = (index) => {
    const updatedMatches = [...matches];
    updatedMatches[index] = { ...updatedMatches[index], homeScore, awayScore };
    setMatches(updatedMatches);
    setHomeScore(0);
    setAwayScore(0);
  };

  const handleFinishMatch = (index) => {
    const updatedMatches = [...matches];
    updatedMatches.splice(index, 1);
    setMatches(updatedMatches);
  };

  const getSummary = () => {
    const sortedMatches = matches.sort((a, b) => {
      const totalScoreDifference = (b.homeScore + b.awayScore) - (a.homeScore + a.awayScore);
      if (totalScoreDifference !== 0) {
        return totalScoreDifference;
      }
      // If total score is the same, sort by index (recently started match)
      return matches.indexOf(b) - matches.indexOf(a);
    });

    return sortedMatches.map((match, index) => (
      <li key={index} style={matchStyle}>
        {match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}
        <button data-testid="finish-match-button" onClick={() => handleFinishMatch(index)} style={finishButtonStyle}>Finish Match</button>
      </li>
    ));
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Live Football Scoreboard</h2>
      <div style={inputContainerStyle}>
        <h3>Start Match</h3>
        <input
          type="text"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          placeholder="Home Team"
          style={inputStyle}
        />
        <input
          type="text"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          placeholder="Away Team"
          style={inputStyle}
        />
        <button data-testid="start-match-button" onClick={handleStartMatch} style={buttonStyle}>Start Match</button>
      </div>
      <div style={inputContainerStyle}>
        <h3>Update Score</h3>
        <input
          type="number"
          value={homeScore}
          onChange={(e) => setHomeScore(parseInt(e.target.value))}
          placeholder="Home Score"
          style={inputStyle}
        />
        <input
          type="number"
          value={awayScore}
          onChange={(e) => setAwayScore(parseInt(e.target.value))}
          placeholder="Away Score"
          style={inputStyle}
        />
        <button onClick={() => handleUpdateScore(matches.length - 1)} style={buttonStyle}>Update Score</button>
      </div>
      <div data-testid="matches-list" style={matchesContainerStyle}>
        <h3>Matches</h3>
        <ul style={matchesListStyle}>
          {getSummary()}
        </ul>
      </div>
    </div>
  );
}

export default LiveFootballScoreboard;

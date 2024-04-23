# Live Football Scoreboard

This project is a live football scoreboard application that allows users to start matches, update scores, and finish matches.

## Installation

To run this application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Start the development server by running `npm start`.

## Usage

- **Start Match:** Enter the names of the home and away teams, then click "Start Match" to begin.
- **Update Score:** Enter the scores for the home and away teams, then click "Update Score" to update the match score.
- **Finish Match:** Click "Finish Match" to remove the match from the scoreboard.

## Assumptions and Notes

- The application assumes that each match starts with a score of 0 for both the home and away teams.
- Negative scores are not allowed. The input fields for scores only accept non-negative integers.
- The matches are displayed in descending order based on the total score. If multiple matches have the same total score, the most recently started match is displayed first.
- The application provides basic styling for a better user experience. However, additional styling can be implemented as needed.
- This README serves as documentation for the project and also includes any assumptions or notes for the developers.


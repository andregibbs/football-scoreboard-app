import React from "react";
import { render, fireEvent, waitFor, screen} from "@testing-library/react";
import LiveFootballScoreboard from "./LiveFootballScoreboard";

describe("LiveFootballScoreboard component", () => {
  test("renders correctly", () => {
    const { getByRole, getByPlaceholderText } = render(<LiveFootballScoreboard />);

    // Check if the header is rendered
    expect(getByRole("heading", { name: "Live Football Scoreboard" })).toBeInTheDocument();

    // Check if input fields and buttons are rendered
    expect(getByPlaceholderText("Home Team")).toBeInTheDocument();
    expect(getByPlaceholderText("Away Team")).toBeInTheDocument();
    expect(getByRole("button", { name: "Start Match" })).toBeInTheDocument();
    expect(getByPlaceholderText("Home Score")).toBeInTheDocument();
    expect(getByPlaceholderText("Away Score")).toBeInTheDocument();
    expect(getByRole("button", { name: "Update Score" })).toBeInTheDocument();
  });

  test("allows user to start a match", async () => {
    const { getByTestId, getByPlaceholderText, container } = render(<LiveFootballScoreboard />);

    // Simulate user input and click on "Start Match" button
    fireEvent.change(getByPlaceholderText("Home Team"), { target: { value: "Home Team" } });
    fireEvent.change(getByPlaceholderText("Away Team"), { target: { value: "Away Team" } });
    fireEvent.click(getByTestId("start-match-button"));

  });

  test("allows user to update score", async () => {
    const { getByTestId, getByPlaceholderText, getByRole } = render(<LiveFootballScoreboard />);

    // Start a match
    fireEvent.change(getByPlaceholderText("Home Team"), { target: { value: "Home Team" } });
    fireEvent.change(getByPlaceholderText("Away Team"), { target: { value: "Away Team" } });
    fireEvent.click(getByTestId("start-match-button"));

    // Update the score
    fireEvent.change(getByPlaceholderText("Home Score"), { target: { value: 1 } });
    fireEvent.change(getByPlaceholderText("Away Score"), { target: { value: 2 } });
    fireEvent.click(getByRole("button", { name: "Update Score" }));

    // Check if the updated score is reflected
    await waitFor(() => {
      const updatedScoreElement = getByTestId("matches-list").querySelector("li");
      expect(updatedScoreElement.textContent).toContain("Home Team 1 - 2 Away Team");
    });
  });

  test("allows user to finish a match", () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<LiveFootballScoreboard />);
  
    // Start a match
    fireEvent.change(getByPlaceholderText("Home Team"), { target: { value: "Home Team" } });
    fireEvent.change(getByPlaceholderText("Away Team"), { target: { value: "Away Team" } });
    fireEvent.click(screen.getByTestId("start-match-button")); // Update to getByTestId
    fireEvent.click(getByText("Finish Match"));
  
    // Check if the match is removed from the scoreboard
    expect(queryByText("Home Team 0 - 0 Away Team")).not.toBeInTheDocument();
  });  
  
});

// BASE SOLUTION
// Add input form
// 10 guesses - each guess can only consist of 1 letter at a time
// Re-render the correct guessedLetters
// Tell player they won if user guesses all letters correctly
// Reveal the word if user runs out of guesses
// Option to reset the game and play again

import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  // ADDITIONAL STATES
  // set 10 remainingGuesses
  const [remainingGuesses, setRemainingGuesses] = useState(10);
  // indicate whether the game is over or not
  const [gameOver, setGameOver] = useState(false);

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // ADDITIONAL FUNCTIONS
  // handleGuess - called function when user submits a guess
  const handleGuess = (event) => {
    // prevent default form submission behavior
    event.preventDefault();
    // retrieve user's guess from form input and convert it into lowercase
    const guess = event.target.elements.guess.value.toLowerCase();
    // INPUT FORM VALIDATION
    // check if user's guess is a single letter
    if (guess.length !== 1) {
      alert("Please enter a single letter.");
      return;
    }
    // check if the letter has already been guessed
    if (guessedLetters.includes(guess)) {
      alert("You've already guessed that letter.");
      return;
    }
    // if correct guess, adds user's guess to guessedLetters using spread operator
    setGuessedLetters([...guessedLetters, guess]);
    // if incorrect guess, decrement remainingGuesses
    if (!currWord.includes(guess)) {
      setRemainingGuesses(remainingGuesses - 1);
    }
    // compare word display with currWord - set gameOver to true if they match
    if (generateWordDisplay().replaceAll(" ", "") === currWord) {
      setGameOver(true);
    }
    // reset form input value and clear input field
    event.target.reset();
  };

  // resetGame - reset state and play the game again
  const resetGame = () => {
    // generate new getRandomWord
    setCurrentWord(getRandomWord());
    // reset guessedLetters
    setGuessedLetters([]);
    // reset remainingGuesses back to 10
    setRemainingGuesses(10);
    setGameOver(false);
  };

  // revealWord - after user runs out of guesses
  const revealWord = () => {
    // set guessedLetters to currWord
    setGuessedLetters(currWord.split(""));
    setRemainingGuesses(0);
    setGameOver(true);
  };

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Hangman logo" />
      </div>
      <div className="card">
        <h2>Guess the Word</h2>
        <h4>Word Display:</h4>
        <p>{generateWordDisplay()}</p>
        <h4>Guessed Letters:</h4>
        <p>{guessedLetters.length > 0 ? guessedLetters.toString() : "-"}</p>
        <br />
        {gameOver ? (
          <div>
            {remainingGuesses > 0 ? (
              <h3>Congratulations! You guessed the word.</h3>
            ) : (
              <h3>Game Over! The word was: {currWord}</h3>
            )}
            <button onClick={resetGame}>Play Again</button>
          </div>
        ) : (
          <form onSubmit={handleGuess}>
            <input type="text" name="guess" maxLength="1" />
            <button type="submit">Guess</button>
            <p>Remaining Guesses: {remainingGuesses}</p>
            {remainingGuesses === 0 && (
              <button onClick={revealWord}>Reveal Word</button>
            )}
          </form>
        )}
      </div>
    </>
  );
}

export default App;

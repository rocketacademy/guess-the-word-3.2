import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState } from "react";

// Store program parameters as "constants" in SCREAM_CASE at top of file or in dedicated constants file for easy access
// This makes num starting guesses easier to edit than if we had hard-coded 10 everywhere
const NUM_STARTING_GUESSES = 10;

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);

  const [numGuessesLeft, setNumGuessesLeft] = useState(NUM_STARTING_GUESSES);
  const [input, setInput] = useState("");

  // Add additional states below as required.

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // Show each letter in current word that exists in guessedLetters
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

  // create additional function to power the

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }

    // Only save  first letter of submission, turn it to lower case
    const inputLetter = input[0].toLowerCase();

    // Use previous state to generate the new state for guessedLetters
    // Use spread operator to createa  new array, not reference the old state.
    setGuessedLetters((prevState) => [...prevState, inputLetter]);

    // Reduce num guesses if the user guesses incorrectly
    if (currWord.includes(inputLetter)) {
      console.log("Correct letter");
    } else {
      setNumGuessesLeft(numGuessesLeft - 1);
    }

    // Reset inputfield
    setInput("");
  };

  const checkHasUserGuessedWord = () => {
    // Create new array with spread operator because we do not wish to alter guessedLetters
    const currentGuessedLetters = [...guessedLetters];
    for (let letter of currWord) {
      if (!currentGuessedLetters.includes(letter)) {
        return false;
      }
    }
    // Return true if guessedLetters contains all letters are in currWord
    return true;
  };

  const resetGame = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setNumGuessesLeft(NUM_STARTING_GUESSES);
    setInput("");
  };

  const hasUserGuessedWord = checkHasUserGuessedWord();
  const shouldDisableInput = hasUserGuessedWord || numGuessesLeft === 0;
  const playAgainButton = <button onClick={resetGame}>Play Again</button>;

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <br />
        <p>Num guesses left: {numGuessesLeft}</p>

        <h3>Input</h3>
        <p>Please submit 1 letter at a time.</p>

        <form onSubmit={handleSubmit}>
          {/* Disable input fields once user guesses word or runs out of guesses */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={shouldDisableInput}
          />
          <input type="submit" value="Submit" disabled={shouldDisableInput} />
        </form>
        {/* Congrats message if user guesses word */}
        {hasUserGuessedWord && (
          <div>
            <p>Congrats on guessing the word!</p>
            {playAgainButton}
          </div>
        )}
        {/* Sorry message if user runs out of guesses */}
        {numGuessesLeft === 0 && !hasUserGuessedWord && (
          <div>
            <p>Sorry, you ran out of guesses.</p>
            {playAgainButton}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

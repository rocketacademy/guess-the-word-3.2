import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [errorState, setErrorState] = useState(false);

  // Add additional states below as required.
  const [guess, setGuess] = useState("");

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

  // create additional function to power the
  const handleSubmit = (word) => {
    if (!guessedLetters.includes(word) && !!word) {
      setErrorState(false);
      setGuessedLetters((x) => [...x, word]);
      setGuess("");
    } else {
      setErrorState(true);
      setGuess("");
    }
  };
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
        {guessedLetters.toString()}
        <br />
        <h3>Input</h3>
        {/* Insert form element here */}
        <input
          placeholder="Type in letter here"
          maxLength="1"
          pattern="[a-zA-Z]"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button onClick={() => handleSubmit(guess)}>Guess!</button>
        <p>{errorState ? "Invalid Input!" : ""}</p>
      </div>
    </>
  );
}

export default App;

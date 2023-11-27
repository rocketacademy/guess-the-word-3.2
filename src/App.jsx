import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessLeft, setGuessLeft] = useState(10);
  const [winLose, setWinLose] = useState(null);

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
    console.log(currWord);
    return wordDisplay.toString();
  };

  const handleGuess = (event) => {
    event.preventDefault();
    const input = event.target.elements.input.value; // Get the value of the input field
    setGuessedLetters([...guessedLetters, input]); // Add the guessed letter to the guessedLetters state
    if (!currWord.includes(input)) {
      setGuessLeft(guessLeft - 1);
    }
    event.target.reset(); // Reset the input field
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
        {guessedLetters.length > 0 ? guessedLetters.toString().toUpperCase() : ""}
        <br />
        <h3> No. of guesses left: {guessLeft}</h3>
        <h3>Input</h3>
        <form onSubmit={handleGuess}>
          <input type="text" id="input"></input>
          <br />
          <button type="submit">Guess</button>
        </form>
      </div>
    </>
  );
}

export default App;

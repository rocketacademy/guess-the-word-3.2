import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState, useEffect } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Add additional states below as required.
  const [guess, setGuess] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [lives, setLives] = useState(10);
  const [gameState, setGameState] = useState(0); //0 is ongoing, 1 means end-lose, 2 means end-win

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
  const displayWord = generateWordDisplay();

  // create additional function to power the
  const handleSubmit = (word) => {
    if (!guessedLetters.includes(word) && !!word) {
      setErrorState(false);
      setGuessedLetters((x) => [...x, word]);
      setGuess("");
      if (!currWord.includes(word)) {
        setLives((x) => x - 1);
      }
    } else {
      setErrorState(true);
      setGuess("");
    }
  };

  useEffect(() => {
    if (lives === 0) {
      setGameState(1);
    } else if (!displayWord.includes("_")) {
      setGameState(2);
    }
  });

  const resetGame = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setGuess("");
    setErrorState(false);
    setLives(10);
    setGameState(0);
  };

  //for cheating and checking
  // useEffect(() => {
  //   console.log(currWord);
  //   console.log(lives);
  //   console.log(gameState);
  // }, [lives, gameState]);

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {displayWord}
        <h3>Guessed Letters</h3>
        {guessedLetters.toString()}
        <br />
        <h3>{lives} lives left</h3>
        {gameState === 0 ? <h3>Input</h3> : ""}
        {/* Insert form element here */}
        {gameState === 0 ? (
          <div className="textField">
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
        ) : gameState === 1 ? (
          <>
            <p>You ran out of lives!</p>
            <button onClick={() => resetGame()}>Restart Game</button>
          </>
        ) : gameState === 2 ? (
          <>
            <p>You won with {lives} lives left!</p>
            <button onClick={() => resetGame()}>Restart Game</button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;

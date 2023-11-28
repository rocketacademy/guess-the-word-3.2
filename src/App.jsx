import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState, useEffect } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // const [currWord, setCurrentWord] = useState("pillow");
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [totalGuesses, setTotalGuesses] = useState(10);

  // Add additional states below as required.

  const reset = () => {
    setCurrentWord(useState(getRandomWord()));
    setGuessedLetters(useState([]));
    setSelectedLetter(useState(""));
    setTotalGuesses(useState(10));
  };

  const checkWin = () => {
    let result = true;
    for (let char of currWord) {
      if (guessedLetters.includes(char.toUpperCase()) === false) {
        return false;
      }
    }
    return true;
  };

  let didPlayerWin = checkWin();

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter.toUpperCase())) {
        wordDisplay.push(letter);
        didPlayerWin = checkWin();
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // create additional function to power the

  const checkGuessCount = () => {
    if (totalGuesses === 1 && didPlayerWin === false) {
      return `You're out of guesses! The word was ${currWord}`;
    }
  };

  let buttonText = () => {
    console.log(didPlayerWin);
    if (totalGuesses === 1 || didPlayerWin === true) {
      return (
        <button onClick={reset} type="submit">
          Reset
        </button>
      );
    }
    return (
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedLetter);

    if (guessedLetters.includes(selectedLetter) || selectedLetter === "") {
      alert(`Guess another letter!`);
    } else {
      setGuessedLetters((current) => [...current, selectedLetter]);

      if (currWord.includes(guessedLetters) === false) {
        setTotalGuesses(totalGuesses - 1);
        console.log(totalGuesses);
      }
    }
    setSelectedLetter("");
  };

  useEffect(() => {
    // setGuessedLetters((current) => [...current, selectedLetter]);
    console.log(`real guessed letter ${guessedLetters}`);
  }, [guessedLetters]);

  useEffect(() => {
    // setGuessedLetters((current) => [...current, selectedLetter]);
    console.log(`didplayer win ${didPlayerWin}`);
  }, [didPlayerWin]);

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
        {guessedLetters.length > 0 ? guessedLetters.toString() : ""}
        <br />
        <h3>Input</h3>
        {/* Insert form element here */}
        <form>
          <label>
            Guess a letter
            {/* <input maxLength={1} type="text" name="guessedLetter" />{" "} */}
            <select
              value={selectedLetter}
              onChange={(e) => {
                setSelectedLetter(e.target.value);
              }}
              name="selectedLetter"
              // defaultValue="A"
            >
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C </option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F </option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I </option>
              <option value="J">J</option>
              <option value="K">K</option>
              <option value="L">L </option>
              <option value="M">M</option>
              <option value="N">N</option>
              <option value="O">O </option>
              <option value="P">P</option>
              <option value="Q">Q</option>
              <option value="R">R </option>
              <option value="S">S</option>
              <option value="T">T</option>
              <option value="U">U</option>
              <option value="V">V </option>
              <option value="W">W</option>
              <option value="X">X</option>
              <option value="Y">Y </option>
              <option value="Z">Z </option>
            </select>
          </label>

          {buttonText()}
          {/* </button> */}
        </form>
        <h1> {didPlayerWin === true && "You guessed the word!"}</h1>
        <h3> {checkGuessCount()}</h3>
      </div>
    </>
  );
}

export default App;

import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useEffect, useState } from "react"; 

function App() {
  const [currWord, setCurrentWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [currLetter, setCurrLetter] = useState('');
  const [alreadyGuessedLetterMsg, setAlrMessage] = useState('');
  const [guessesLeft, setGuessesLeft] = useState(10);
  const [winState, setWinState] = useState(false);

  const generateWordDisplay = () => {
    const wordDisplay = [];

    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }

    return wordDisplay.toString()
  };

  const handleInputChange = (event) => {
    setCurrLetter(event.target.value);
  }

  const updateGuessedLetters = () => {
    if (guessedLetters.includes(currLetter)) {
      setAlrMessage("You have guessed this letter before. Try Again!") 
    } else {
      setAlrMessage("");
      setGuessedLetters(prevItems => [...prevItems, currLetter]);   
      if(!currWord.includes(currLetter)){
        setGuessesLeft(prevState => prevState - 1)
      } 
    }
  }

  const checkWin = (wordArray) => {
    for (let letter of wordArray) {
      if (!guessedLetters.includes(letter)) {
        return false
      }
    }
    return true; 
  }

  const displayImage = () => {
    let path = "src/images/" + guessesLeft + ".jpg";
    return <img src={path}  alt="10 Guesses" />;
  }

  const resetGame = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setCurrLetter('');
    setAlrMessage('');
    setGuessesLeft(10);
    setWinState(false);
  }

  useEffect(() => {
    checkWin(currWord)? setWinState(true): setWinState(false)
  }, [guessedLetters])

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div>
        <h2>Guess The Word:</h2>
        <div className="hidden-word">{generateWordDisplay()}</div>
        {guessesLeft == 0 ? <h3 style={{ color: "red" }}>You Lost!</h3> : null}
        {winState ? <h3 style={{ color: "#90EE90" }}>You Won!</h3> : null}
        {winState || guessesLeft == 0 ? (
          <button onClick={resetGame}> Reset Game!</button>
        ) : null}
      </div>
      <div className="card">
        <div className="right-side">
          <div>{displayImage()}</div>
        </div>
        <div className="left-side">
          <div className="number-guesses">Guesses Left: {guessesLeft}</div>
          <div className="guessed-letters">
            <h3>Guessed Letters</h3>
            <div>
              {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
            </div>
          </div>
          <div className="input-container">
            <h3>Input</h3>
            <div className="already-guessed">
              {alreadyGuessedLetterMsg ? (
                <h5>{alreadyGuessedLetterMsg}</h5>
              ) : null}
            </div>

            <input
              type="text"
              value={currLetter}
              onChange={handleInputChange}
            ></input>
            <button onClick={updateGuessedLetters}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

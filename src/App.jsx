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

  const generateWordDisplay = () => {
    const wordDisplay = [];

    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  const handleInputChange = (event) => {
    setCurrLetter(event.target.value);
  }

  const updateGuessedLetters = () => {
    if (guessedLetters.includes(currLetter)) {
      setAlrMessage("You have guessed this letter before. Try Again!") 
    } else {
      setGuessedLetters(prevItems => [...prevItems, currLetter]);   
      if(!currWord.includes(currLetter)){
        setGuessesLeft(prevState => prevState - 1)
      }
    }
  }

  const displayImage = () => {
    let path = "src/images/" + guessesLeft + ".jpg";
    return <img src={path}  alt="10 Guesses" />;
  }

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h6>{currWord}</h6>
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <br />        
        <div>
        </div>
        {displayImage()}
        <div>
          Number of Guesses left: {guessesLeft}
          {guessesLeft == 0? <h3 style={{color:"red"}}>You Lost!</h3> : null}
        </div>
        <h3>Input</h3>
        {alreadyGuessedLetterMsg ? <h5>{alreadyGuessedLetterMsg}</h5> : null}
        <input
          type="text"
          value={currLetter}
          onChange={handleInputChange}
        ></input>
        <button onClick={updateGuessedLetters}>Submit</button>
      </div>
    </>
  );
}

export default App;

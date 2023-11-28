import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useEffect, useState } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [inputValue, setInputValue] = useState("")
  const [remainingGuesses, setRemainGuess] = useState(10)


  //takes the input and updates that
  const handleInputChange = (e) =>{
    setInputValue(e.target.value)
  } 
  //on submit, reset input box, add input into guessedLetters
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!guessedLetters.includes(inputValue) && inputValue){
    
    console.log(inputValue)
    setGuessedLetters((prev) => [...prev,inputValue])
    if(!currWord.includes(inputValue)){
      setRemainGuess((prev) => (prev -= 1));
    }
    setInputValue("")}
    else{alert("You either already guessed that or you did not put anything in the guess box")}
  };

  
  
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
  
  //debugging
  useEffect(()=>{
    console.log("currWord ",currWord)
    console.log("GuessedLetters ",guessedLetters)
    console.log("remaining guesses: ", remainingGuesses)
    if(generateWordDisplay() == currWord.split("")){
      console.log("Win")
    }
  },[currWord,guessedLetters, remainingGuesses])

  //enter to submit 
  


  //game states and flow.
  const Lose  = () =>{
    return (
      <div>
        <p>You Lost. The word is: {currWord}</p>
        <button onClick={() => location.reload()}>Play again</button>
      </div>
    );
  }
  const Win  = () =>{
    return (
      <div>
        <p>You Won. Want to play again?</p>
        <button onClick={() => location.reload()}>Play again</button>
      </div>
    );
  }
  const Play = () => {
    return (
      <div>
        <h3>Input</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Guess a letter: </label>
          <input
            autoFocus={true}
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            name="guess"
            id=""
            maxLength={1}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }

  const GameLogic = () =>{
    if(remainingGuesses == 0){
      return <Lose/>
    }
    if(generateWordDisplay() == currWord.split("")){
      return <Win/> 
    }
    else{return <Play/>}
  }
  // create additional function to power the

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
        <GameLogic/>


        <p>Your remaining guesses: {remainingGuesses}</p>

      </div>
    </>
  );
}

export default App;

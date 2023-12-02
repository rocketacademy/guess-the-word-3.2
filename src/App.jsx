import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState, useEffect } from "react";
import Input from "./Input";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  // currWord is a string
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remindertoggle, setReminderToggle] = useState(false);
  //remindertoggle handles whether the user is being reminded (that they already guessed a letter) or not.
  const [userInput, setUserInput] = useState("");
  const [guessesleft, setGuessesLeft] = useState(10);
  const [game_over, setGameOver] = useState(false);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(e.target);
    //preventDefault stops the form from submitting until Enter is actually pressed
    //If I use e.target.value in setGuessedLetters I would be targetting the form submission and the form submission event instead of the actual input event
    const invalid_input = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "`",
      "-",
      "=",
      "~",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "+",
      "<",
      ">",
      "?",
      "\t",
      "\n",
      "\r",
    ];

    if (
      //if the user enters in an invalid input, or tries to add a letter they added before, exit out
      invalid_input.includes(userInput) ||
      guessedLetters.includes(userInput)
    ) {
      setReminderToggle(true);
      return;
    } else {
      setReminderToggle(false);
      setGuessesLeft((prevGuessesLeft) => prevGuessesLeft - 1);
      setGuessedLetters((prevGuessedLetters) => [
        ...prevGuessedLetters,
        userInput,
      ]);
    }
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

  useEffect(
    () => {
      console.log("guessesleft", guessesleft);
      handleGameOver();
    },
    [guessesleft] //array of stuff that useEffect will monitor. effect will only trigger if these values change.
  );

  //if every letter in the guessed letters is in the currword, that means that the entire word has been guessed.
  const handleGameOver = () => {
    console.log(guessedLetters);
    let arrayed_currword = [...currWord];

    let checker = (arr, target) => target.every((v) => arr.includes(v));

    if (checker(guessedLetters, arrayed_currword)) {
      //if every letter in currword is in guessed letters, do this.
      setGameOver(true);
      console.log("You won!");
    } else if (guessesleft === 0) {
      console.log("You ran out of tries, bucko");
      setGameOver(true);
    }
  };

  const resetEverything = () => {
    setCurrentWord(getRandomWord());
    // guessedLetters stores all letters a user has guessed so far
    setGuessedLetters([]);
    setReminderToggle(false);
    //remindertoggle handles whether the user is being reminded (that they already guessed a letter) or not.
    setUserInput("");
    setGuessesLeft(10);
    setGameOver(false);
    return;
  };

  return (
    <>
      <div>
        {console.log(currWord)}
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <br />
        {remindertoggle ? (
          <p>Invalid guess entered! No attempts deducted. Try again.</p>
        ) : (
          <p>Guess a letter!</p>
        )}

        {game_over ? (
          <>
            <p>The word was {currWord}!</p>
            <button onClick={resetEverything}>Restart?</button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input onChange={handleUserInput} value={userInput} />
          </form>
        )}

        <h2>{userInput}</h2>
      </div>
    </>
  );
}

export default App;

//Example ternary operator
// {
//   player1roundwins > player2roundwins ? (
//     <p>🎉🎉Player 1 wins!🎉🎉</p>
//   ) : player1roundwins < player2roundwins ? (
//     <p>🎉🎉Player 2 wins!🎉🎉</p>
//   ) : (
//     <p>😔 Nobody wins. 😔</p>
//   );
// }

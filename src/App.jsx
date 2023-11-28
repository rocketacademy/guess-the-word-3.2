import "./App.css";
import { getRandomWord } from "./utils";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);

  //when user start to key in guesses (string)
  const [guess, setGuess] = useState("");
  //number of guesses per game
  const [userGuess, setUserGuess] = useState("8");
  //change button name
  const [gameOver, setGameOver] = useState(false);
  //change game message
  const [gameMessage, setGameMessage] = useState(
    `You have ${userGuess} guess left.`
  );
  //show play again button at the end of the game
  const [showPlayAgainButton, setShowPlayAgainButton] = useState(false);
  //count the number of rounds and number of wins
  const [roundsPlayed, setRoundsPlayed] = useState(1);
  const [roundsWon, setRoundsWon] = useState(0);

  //prevent page from refreshing
  const handleSubmit = (e) => {
    e.preventDefault();

    //validation of alphabets characters
    function allLetter(guess) {
      var letters = /^[A-Za-z]+$/;
      if (guess.match(letters)) {
        return true;
      } else {
        return false;
      }
    }

    const lowerCaseGuess = guess.toLowerCase();

    if (lowerCaseGuess.length === 1 && allLetter(lowerCaseGuess)) {
      //if letter is not found in the word
      if (!currWord.includes(lowerCaseGuess)) {
        setUserGuess((prevGuess) => prevGuess - 1);
      }
      //update guessed letters
      setGuessedLetters([...guessedLetters, lowerCaseGuess]);
      // reset guess to an empty string after submission
      setGuess("");
      //check winning conditions
    }
  };

  //check if all letters in the current word are found
  const checkHasUserGuessedWord = (userGuess) => {
    const currentGuessedLetters = [...guessedLetters, userGuess];
    for (let letter of currWord) {
      if (!currentGuessedLetters.includes(letter)) {
        return false;
      }
    }
    // return true if guessedLetters contains all letters are in currWord
    return true;
  };

  useEffect(() => {
    const hasUserGuessedWord = checkHasUserGuessedWord(userGuess);
    console.log("Has User Guessed Word:", hasUserGuessedWord);

    // const currentGuessedLetters = [...guessedLetters, userGuess];
    // console.log("Current Guessed Letters:", currentGuessedLetters);

    //check if user guess matches the following conditions
    //userGuess hit 0, no guess allowed.
    if (userGuess === 0) {
      setGameOver(true);
      setGameMessage(`You're out of guesses! The word is '${currWord}'.`);
      setShowPlayAgainButton(true);
      //user guess matches with current word, user wins.
    } else if (hasUserGuessedWord) {
      setGameOver(true);
      setGameMessage(`Yay! You guessed the word! You won.`);
      setShowPlayAgainButton(true);
      setRoundsWon((prevRoundsWon) => prevRoundsWon + 1);
      //if not, shows the number of guesses left
    } else {
      setGameMessage(`You have ${userGuess} guess left.`);
    }
  }, [userGuess, guessedLetters, currWord]);

  // restart game at the end of the round
  const restartGame = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setUserGuess("8");
    setGameOver(false);
    setGameMessage();
    setShowPlayAgainButton(false);
    setRoundsPlayed((prevRoundsPlayed) => prevRoundsPlayed + 1);
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

  return (
    <>
      <div className="card">
        <h2>Hangman</h2>
        <br />
        <Container>
          <Row>
            <Col>
              {" "}
              <img src={`hangman${userGuess}.jpg`} alt="hangman" />
            </Col>
            <Col>
              <h4>Word Display</h4>
              {generateWordDisplay()}
              <br />
              <br />
              <h4>Guessed Letters</h4>
              {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
              <br />
              <br />
              <h4>Input</h4>

              <p>Please key in 1 letter only.</p>
              {/* Insert form element here */}
              <form onSubmit={handleSubmit}>
                <label htmlFor="guess">Your Guess: </label>
                <input
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  type="text"
                  id="guess"
                />
                <br />
                <br />
                <p>{gameMessage}</p>
                <p>
                  Score: {roundsWon} / {roundsPlayed}
                </p>
                <button disabled={gameOver} onClick={handleSubmit}>
                  {" "}
                  Submit Guess
                </button>
                <br />
                {showPlayAgainButton && (
                  <button onClick={restartGame}>Play Again</button>
                )}
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;

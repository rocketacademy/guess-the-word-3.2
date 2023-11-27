import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState, useEffect } from "react";
import { Button, Typography, Container, Box } from "@mui/material";

function App() {
  const [currWord, setCurrentWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessLeft, setGuessLeft] = useState(10);
  const [winLose, setWinLose] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const checkIfPlayerWins = () => {
    return currWord.split("").every((letter) => guessedLetters.includes(letter));
  };

  const generateWordDisplay = () => {
    console.log(currWord);
    return currWord.split("").map((letter, index) => (
      <Box key={index} display="inline-block" border={1} borderRadius="borderRadius" padding={2} margin={1}>
        {guessedLetters.includes(letter) ? letter : "_"}
      </Box>
    ));
  };

  useEffect(() => {
    if (checkIfPlayerWins()) {
      console.log(`Player wins!`);
      setWinLose("win");
    }

    if (guessLeft === 0) {
      console.log(`Player loses!`);
      setWinLose("lose");
    }
  }, [guessedLetters, currWord, guessLeft]);

  const handleGuess = (event) => {
    event.preventDefault();
    const input = event.target.elements.input.value;
    setGuessedLetters([...guessedLetters, input]);

    if (currWord.includes(input)) {
      console.log(`correct letter`);
    } else {
      setGuessLeft(guessLeft - 1);
    }

    setInputValue("");

    event.target.reset();
  };

  const resetGame = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setGuessLeft(10);
    setInputValue("");
    setWinLose(null);
  };

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h1>Guess The Word 🚀</h1>

        <Container>
          <Box border={1} borderRadius="borderRadius" padding={2} marginBottom={2}>
            <Typography variant="h6" component="div">
              Word Display
            </Typography>
            <Typography variant="body1" component="div">
              {generateWordDisplay()}
            </Typography>
          </Box>
        </Container>

        {winLose === "win" && <p>You Win!!</p>}
        {winLose === "lose" && <p>You Lose! Hit "reset" to try again!</p>}

        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString().toUpperCase() : ""}
        <br />
        <h3> No. of guesses left: {guessLeft}</h3>
        <h3>Input</h3>
        <form onSubmit={handleGuess}>
          <input
            type="text"
            id="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: "200px", height: "40px", fontSize: "16px" }}
          ></input>
          <br></br>
          <br></br>
          <Button variant="contained" color="success" type="submit">
            Guess
          </Button>
        </form>
        <br></br>

        <Button variant="contained" color="error" onClick={resetGame}>
          Reset
        </Button>
      </div>
    </>
  );
}

export default App;

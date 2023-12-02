import "./App.css";
import react, { useState } from "react";

const Input = (props) => {
  return (
    <>
      <input
        onChange={props.onChange}
        value={props.userInput}
        type="text"
        maxLength={1}
      ></input>
    </>
  );
};

export default Input;

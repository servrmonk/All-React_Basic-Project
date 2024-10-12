import { useState, useEffect } from "react";
import "./index.css";

export default function Calculate() {
  const [inputValue, setInputValue] = useState("");

  const display = (value) => {
    setInputValue((prev) => prev + value);
  };

  const calculate = (e) => {
    try {
      const answer = eval(e.target.value);
      setInputValue(answer.toString());
    } catch (error) {
      setInputValue("Error");
    }
  };

  const clear = () => {
    setInputValue("");
  };

  const handleKeyPress = (event) => {
    const validKeys = "0123456789+-*/.";
    if (validKeys.includes(event.key)) {
      display(event.key);
    } else if (event.key === "Enter") {
      event.preventDefault();
      calculate(event);
    } else if (event.key === "Backspace") {
      setInputValue((prev) => prev.slice(0, -1)); 
    } else if (event.key === "c") {
      clear();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <form className="calculator" name="calc" onSubmit={(e) => e.preventDefault()}>
      <input type="text" className="value" value={inputValue} readOnly />
      <span className="num clear" onClick={clear}>
        c
      </span>
      <span onClick={() => display("/")}>/</span>
      <span onClick={() => display("*")}>*</span>
      <span className="numb" onClick={() => display("7")}>7</span>
      <span className="numb" onClick={() => display("8")}>8</span>
      <span className="numb" onClick={() => display("9")}>9</span>
      <span onClick={() => display("-")}>-</span>
      <span className="numb" onClick={() => display("4")}>4</span>
      <span className="numb" onClick={() => display("5")}>5</span>
      <span className="numb" onClick={() => display("6")}>6</span>
      <span className="plus" onClick={() => display("+")}>
        +
      </span>
      <span className="numb" onClick={() => display("1")}>1</span>
      <span className="numb" onClick={() => display("2")}>2</span>
      <span className="numb" onClick={() => display("3")}>3</span>
      <span className="numb" onClick={() => display("0")}>0</span>
      <span className="numb" onClick={() => display("00")}>00</span>
      <span onClick={() => display(".")}>.</span>
      <span className="num equal" onClick={calculate}>
        =
      </span>
    </form>
  );
}

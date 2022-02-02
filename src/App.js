import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const refValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === refValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    tenzies
      ? setDice(allNewDice())
      : setDice((prevDice) =>
          prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    setTenzies(false);
  }

  function holdDice(dieId) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === dieId ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      value={die.value}
    />
  ));

  return (
    <main>
      {tenzies && <ReactConfetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "Reset" : "Roll"}
      </button>
    </main>
  );
}

export default App;

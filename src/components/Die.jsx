import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  };

  return (
    <div
      className="die-face"
      onClick={props.holdDice}
      style={styles}
    >
      <h2>{props.value}</h2>
    </div>
  );
}

export default Die;

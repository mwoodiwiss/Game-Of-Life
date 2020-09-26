import React from "react";
import "../css/Controls.css";

const Controls = (props) => {
  const makeGridSmall = () => {
    props.gridSize("small");
  };

  const makeGridRegular = () => {
    props.gridSize("regular");
  };

  const makeGridLarge = () => {
    props.gridSize("large");
  };

  const setSpeedFast = () => {
    props.genSpeed("fast");
  };

  const setSpeedFaster = () => {
    props.genSpeed("faster");
  };

  const setSpeedFastest = () => {
    props.genSpeed("fastest");
  };

  return (
    <div className="controls">
      <div className="button" onClick={props.play}>
        Play
      </div>
      <div className="button" onClick={props.pause}>
        Pause
      </div>
      <div className="button" onClick={props.next}>
        Next
      </div>
      <div className="button" onClick={props.randomSeed}>
        Random
      </div>
      <div className="button" onClick={props.clear}>
        Clear
      </div>
      <div className="dropdown">
        <button className="dropbtn">Size</button>
        <div className="dropdown-content">
          <p onClick={makeGridSmall}>Small</p>
          <p onClick={makeGridRegular}>Regular</p>
          <p onClick={makeGridLarge}>Large</p>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Speed</button>
        <div className="dropdown-content">
          <p onClick={setSpeedFast}>Fast</p>
          <p onClick={setSpeedFaster}>Faster</p>
          <p onClick={setSpeedFastest}>Fastest</p>
        </div>
      </div>
    </div>
  );
};

export default Controls;

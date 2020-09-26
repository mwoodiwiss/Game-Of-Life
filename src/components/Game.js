import React from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import "../css/Game.css";

var time = 100;

function makeEmptyGrid(rows, columns) {
  return Array(rows)
    .fill()
    .map(() => Array(columns).fill(false));
}

function copyGrid(arr) {
  return JSON.parse(JSON.stringify(arr));
}

class Game extends React.Component {
  constructor() {
    super();
    this.speed = time;
    this.rows = 25;
    this.columns = 25;
    this.state = {
      generations: 0,
      grid: makeEmptyGrid(this.rows, this.columns)
    };
  }

  selectCell = (row, col) => {
    let newGrid = copyGrid(this.state.grid);
    newGrid[row][col] = !newGrid[row][col];
    this.setState({
      grid: newGrid,
    });
  };

  randomSeed = () => {
    this.clear();
    let newGrid = copyGrid(this.state.grid);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (Math.floor(Math.random() < 0.4)) {
          newGrid[i][j] = true;
        }
      }
    }
    this.setState({
      grid: newGrid,
    });
  };

  play = () => {
    this.speed = time;
    clearInterval(this.interval);
    this.interval = setInterval(this.run, this.speed);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  next = () => {
    this.run();
  };

  clear = () => {
    clearInterval(this.interval);
    let emptyGrid = makeEmptyGrid(this.rows, this.columns);
    this.setState({
      grid: emptyGrid,
      generations: 0,
    });
  };

  gridSize = (size) => {
    switch (size) {
      case "small":
        this.rows = 10;
        this.columns = 10;
        break;
      case "regular":
        this.rows = 25;
        this.columns = 25;
        break;
      case "large":
        this.rows = 40;
        this.columns = 40;
        break;
      default:
        this.rows = 25;
        this.columns = 25;
    }
    this.clear();
  };

  genSpeed = (speed) => {
    switch (speed) {
      case "fast":
        time = 100;
        this.speed = time;
        clearInterval(this.interval);
        this.interval = setInterval(this.run, this.speed);
        break;
      case "faster":
        time = 50;
        this.speed = time;
        clearInterval(this.interval);
        this.interval = setInterval(this.run, this.speed);
        break;
      case "fastest":
        time = 1;
        this.speed = time;
        clearInterval(this.interval);
        this.interval = setInterval(this.run, this.speed);
        break;
      default:
        time = 100;
        this.speed = time;
        clearInterval(this.interval);
        this.interval = setInterval(this.run, this.speed);
    }
  };

  run = () => {
    let grid = this.state.grid;
    let newGrid = copyGrid(this.state.grid);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let count = 0;
        if (i > 0) {
          if (grid[i - 1][j]) count++;
        }
        if (i > 0 && j > 0) {
          if (grid[i - 1][j - 1]) count++;
        }
        if (i > 0 && j < this.columns - 1) {
          if (grid[i - 1][j + 1]) count++;
        }
        if (j < this.columns - 1) {
          if (grid[i][j + 1]) count++;
        }
        if (j > 0) {
          if (grid[i][j - 1]) count++;
        }
        if (i < this.rows - 1) {
          if (grid[i + 1][j]) count++;
        }
        if (i < this.rows - 1 && j > 0) {
          if (grid[i + 1][j - 1]) count++;
        }
        if (i < this.rows - 1 && j < this.columns - 1) {
          if (grid[i + 1][j + 1]) count++;
        }
        if (grid[i][j] && (count < 2 || count > 3)) {
          newGrid[i][j] = false;
        }
        if (!grid[i][j] && count === 3) {
          newGrid[i][j] = true;
        }
      }
    }

    this.setState({
      grid: newGrid,
      generations: this.state.generations + 1,
    });
  };

  render() {
    return (
      <div className="game">
        <div className="top">
          <h2>Conway's Game of Life</h2>
          <h4>Generations: {this.state.generations}</h4>
        </div>
        <div className="main">
          <Grid
            grid={this.state.grid}
            rows={this.rows}
            columns={this.columns}
            selectCell={this.selectCell}
          />
          <Controls
            play={this.play}
            pause={this.pause}
            next={this.next}
            clear={this.clear}
            randomSeed={this.randomSeed}
            gridSize={this.gridSize}
            genSpeed={this.genSpeed}
          />
        </div>
      </div>
    );
  }
}

export default Game;

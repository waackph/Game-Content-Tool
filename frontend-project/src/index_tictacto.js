import React from 'react';
import ReactDOM from 'react-dom';
import './index_tictacto.css';

function Square(props) {
  return (
    <button 
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
  
  class Board extends React.Component {

    renderSquare(i) {
      return ( 
        <Square 
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        coordinates: [{
          moveCoords: Array(2).fill(null),
        }],
      }
    }

    handleClick(i) {
      // use slice() to create a copy of array, also use it to remove all future moves when time travel is used
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const coordinates = this.state.coordinates.slice(0, this.state.stepNumber + 1);
      
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        coordinates: coordinates.concat([{
          moveCoords: this.calculateCoordinates(i),
        }]),
      });
    }

    calculateCoordinates(i) {
      let row = null;
      let col = null;
      if (i >= 0 && i <=2) {
        row = 0;
      }
      else if (i >= 3 && i <= 5) {
        row = 1;
      }
      else {
        row = 2;
      }
      if (i === 0 || i === 3 || i === 6) {
        col = 0;
      }
      else if (i === 1 || i === 4 || i === 7) {
        col = 1;
      }
      else if (i === 2 || i === 5 || i === 8) {
        col = 2;
      }
      return [col, row];
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      // Map the history state indices to buttons
      const moves = history.map((step, move) => {
        let desc = move ? 
          'Go to move #' + move :
          'Go to game start';
        const currMoveCoords = this.state.coordinates[move];
        desc = currMoveCoords.moveCoords[0] == null ? 
          desc :
          desc + '; (' + currMoveCoords.moveCoords[0] + ', ' + currMoveCoords.moveCoords[1] + ')';
        // add class to bolden current step
        const stepActiveClass = this.state.stepNumber === move ? 
          'stepActive' :
          '';
        return (
          // use key in a dynamically generated list to identify each components and distinct it from its siblings
          // In this case we can use the array index. 
          // This is only allowed when the array is not modified by deleting or reordering elements
          <li key={move}>
            <button className={stepActiveClass} onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } 
      else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              // the i is just a parameter of the handleClick function that will be passed and used in the Board component
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    // an array of all possible lines where the same symbol will lead to a win
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    // if no line consists only of one symbol, then return null
    return null;
  }
  
  // ========================================
  
  // ReactDOM.render(
  //   <Game />,
  //   document.getElementById('root')
  // );
  
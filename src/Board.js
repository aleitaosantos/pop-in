import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }
  constructor( props ) {
    super( props );

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly pop or unpop */

  createBoard() {
    let board = [];
    for ( let y = 0; y < this.props.nrows; y++ ) {
      let row = [];
      for ( let x = 0; x < this.props.ncols; x++ ) {
        row.push( Math.random() < this.props.chanceLightStartsOn )
      }
      board.push( row );
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround( coord ) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [ y, x ] = coord.split( "-" ).map( Number );


    function flipCell( y, x ) {
      // if this coord is actually on board, flip it

      if ( x >= 0 && x < ncols && y >= 0 && y < nrows ) {
        board[ y ][ x ] = !board[ y ][ x ];
      }
    }
    //Pop initial cell
    flipCell( y, x );     //pop center
    flipCell( y, x - 1 ); //pop left
    flipCell( y, x + 1 ); //pop right
    flipCell( y - 1, x ); //pop below
    flipCell( y + 1, x ); //pop above
    // flipCell( y - 1, x + 1 ); //hex
    // flipCell( y + 1, x - 1 ); //hex

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every( row => row.every( cell => cell ) );
    this.setState( { board: board, hasWon: hasWon } );
  }


  /** Render game board or winning message. */

  // make table board
  makeTable() {
    let tableBoard = [];
    for ( let y = 0; y < this.props.nrows; y++ ) {
      let row = [];
      for ( let x = 0; x < this.props.ncols; x++ ) {
        let coord = `${ y }-${ x }`;
        row.push(
          <Cell
            key={ coord }
            isPop={ this.state.board[ y ][ x ] }
            flipCellsAroundMe={ () => this.flipCellsAround( coord ) }
          />
        );
      }
      tableBoard.push( <tr key={ y }>{ row }</tr > );
    }
    return (
      <div className='Board'>
        <table >
          <tbody>{ tableBoard }</tbody>
        </table>
      </div>
    );
  }
  render() {
    return (
      <div>
        { this.state.hasWon ? (
          < div className='winner'> YOU WIN! </div>
        ) : (
          <div>
            { this.makeTable() }
          </div>
        )
        }
      </div>
    );
  }


}


export default Board;

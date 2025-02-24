import React, { Component } from "react";
import Cell from "./Cell";
import Reset from './Reset'
import Help from "./Help";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
  }
  constructor( props ) {
    super( props );
    // this.initFlip = this.initFlip.bind( this );
    // this.flipCellsAround = this.flipCellsAround.bind( this )

    this.state = {
      hasWon: false,
      helpAsked: false,
      board: this.createBoard(),
      initFlip: this.initFlip(),
      moves: 0
    }
  }



  createBoard() {
    let board = [];
    for ( let y = 0; y < this.props.nrows; y++ ) {
      let row = [];
      for ( let x = 0; x < this.props.ncols; x++ ) {
        row.push( false )
      }
      board.push( row );
    }

    return board;
  }

  askHelp() {
    let helpAsked = this.state.helpAsked;
    this.setState( {
      helpAsked: !helpAsked
    } )
  }

  reset() {
    this.setState( {
      board: this.createBoard(),
      hasWon: false,
      helpAsked: false,
      moves: 0
    } )
  }

  share() {
    if ( navigator && navigator.clipboard && navigator.clipboard.writeText )
      setTimeout( () => {
        alert( 'Copied to clipboard! Paste it at your social media.' );
      }, 10 );
    return navigator.clipboard.writeText(
      `I played POP-POP and won after ${ this.state.moves } move${ this.state.moves > 1 ? 's' : '' }. Play at https://poppop.netlify.app/. #PopPopGame`
    )
  }

  flipCellsAround( coord ) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let moves = this.state.moves;
    let [ y, x ] = coord.split( "-" ).map( Number );


    function flipCell( y, x ) {

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

    this.setState( { moves: moves + 1 } )

    let hasWon = board.every( row => row.every( cell => cell ) );
    this.setState( { board: board, hasWon: hasWon } );
  }

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

      <table >
        <tbody>{ tableBoard }</tbody>
      </table>

    );
  }

  initFlip() {
    console.log( 'FLIP CELLS' )
  }

  render() {
    return (
      <div>
        <div className='Board'>
          <div className='HeaderContainer'>
            <Reset reset={ () => this.reset() } />
            <div>POP-POP</div>
            <Help askHelp={ () => this.askHelp() } />
          </div>


          { this.state.hasWon ? (
            <div className='TextContainer'>
              <div className="Win"> WIN! </div>
              <div className='TextContainer'>
                <p onClick={ () => this.share() } style={ { cursor: "pointer", textAlign: "center" } }>Share Your Score</p>
              </div>
            </div>

          ) : this.state.helpAsked ? (
            <div className='TextContainer'>
              <div>
                <p> In this game, your objective is to pop all the cells. When you click on any of them, the cell position is reversed. Likewise, the cells that are above, on the left, on the right and below are also inverted. </p>
                <p> A counter at the bottom will measure your performance. Try to solve it with as few tries as possible. </p>
                <p> App by Alexandre Leitão Santos,<br />based on Lights-Out. 2022.</p>
              </div>
            </div>
          ) : (
            <div >
              { this.makeTable() }
            </div>
          )
          }
          <div className="FooterContainer">{ this.state.moves }</div>
        </div>
      </div>
    );
  }


}


export default Board;

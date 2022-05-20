import React, { Component } from 'react'
import "./Cell.css"


class Cell extends Component {
  constructor( props ) {
    super( props );
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( evt ) {
    // call up to the board to flip cells around this cell
    this.props.flipCellsAroundMe();
  }

  render() {
    let classes = "Cell" + ( this.props.isPop ? " Cell-pop" : "" );

    return (
      <td><div className={ classes } onClick={ this.handleClick }></div></td>
    )
  }
}


export default Cell
import React, { Component } from 'react'
import "./Title.css"


class Title extends Component {
  constructor( props ) {
    super( props );
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( evt ) {
    this.props.askHelp();
  }

  render() {
    return (
      <div className="Title" onClick={ this.handleClick }>POP-POP</div>
    )
  }
}


export default Title
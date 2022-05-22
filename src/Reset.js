import React, { Component } from 'react'
import "./Reset.css"


class Reset extends Component {
  constructor( props ) {
    super( props );
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( evt ) {
    this.props.reset();
  }

  render() {
    return (
      <div className="Reset" onClick={ this.handleClick }><i className="fa-solid fa-arrows-rotate"></i></div>
    )
  }
}


export default Reset
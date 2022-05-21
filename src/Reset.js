import React, { Component } from 'react'
import "./Help.css"


class Help extends Component {
  constructor( props ) {
    super( props );
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( evt ) {
    this.props.reset();
  }

  render() {
    return (
      <div className="Help" onClick={ this.handleClick }><i class="fa-solid fa-arrows-rotate"></i></div>
    )
  }
}


export default Help
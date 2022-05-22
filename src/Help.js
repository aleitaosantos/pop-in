import React, { Component } from 'react'
import "./Help.css"


class Help extends Component {
  constructor( props ) {
    super( props );
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( evt ) {
    this.props.askHelp();
  }

  render() {
    return (
      <div className="Help" onClick={ this.handleClick }>{
        this.props.helpAsked ? <i class="fa-solid fa-xmark"></i> : <i className="fa-solid fa-question"></i>
      }</div>
    )
  }
}


export default Help
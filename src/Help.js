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
    let icon = ( this.props.helpAsked ? <i class="fa-solid fa-xmark"></i> : <i class="fa-solid fa-question"></i> );
    return (
      <div className="Help" onClick={ this.handleClick }>{ icon }</div>
    )
  }
}


export default Help
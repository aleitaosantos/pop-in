import React, { Component } from "react";
import './Slider.css';

class Slider extends Component {

  render() {
    return (
      <div class="Slider">
        <input
          id="gameSize"
          type="range"
          min="5" max="10"
          step="1"
        // value={ this.state.value }
        // onChange={ this.handleChange }
        />
      </div>
    )
  }
}

export default Slider;

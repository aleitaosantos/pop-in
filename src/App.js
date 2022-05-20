import React, { Component } from "react";
import Board from "./Board";
import Slider from "./Slider"
import "./App.css";

/** Simple app that just shows the LightsOut game. */

class App extends Component {
  render() {
    return (
      <div className='App'>
        {/* <Slider /> */ }
        <Board />
      </div>
    );
  }
}

export default App;

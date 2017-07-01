import React, { Component } from 'react';
import { Link } from 'react-router';
import Graph from './Graph';

class Main extends Component {
  render() {
    return(
      <div>
        <h1>Main.js</h1>
        <div>
          <Graph/>
        </div>
      </div>
    )
  }
}

export default Main;
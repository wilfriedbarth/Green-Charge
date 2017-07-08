import React, { Component } from 'react';
import { Link } from 'react-router';
import Graph from './Graph';
import SearchBar from './Search_Bar'

class Main extends Component {
  render() {
    return(
      <div>
        <h1>Main.js</h1>
        <div>
        <SearchBar />
        </div>
        <div>
          <Graph />
        </div>
      </div>
    )
  }
}

export default Main;
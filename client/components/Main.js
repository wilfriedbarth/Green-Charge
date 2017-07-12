import React, { Component } from 'react';
import Graph from './Graph';
import SearchBar from './Search_Bar'

class Main extends Component {

  render() {
    return(
        <div>
          <SearchBar />
          <Graph />
        </div>
    )
  }
}

export default Main;
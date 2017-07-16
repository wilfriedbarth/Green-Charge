import React, { Component } from 'react';
import { Link } from 'react-router';
import Graph from './Graph';
import SearchBar from './SearchBar';
import { Container } from 'semantic-ui-react';


class Main extends Component {
  render() {
    return(
      <div>
        <h1>Main.js</h1>
        <SearchBar />
        <Graph />
      </div>
    )
  }
}

export default Main;

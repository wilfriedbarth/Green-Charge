import React, { Component } from 'react';
import { Link } from 'react-router';
import Graph from './Graph';
import SearchBar from './Search_Bar'
import { Container } from 'semantic-ui-react';


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
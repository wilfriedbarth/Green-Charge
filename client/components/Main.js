import React, { Component } from 'react';
import { Link } from 'react-router';
import Graph from './Graph';
import SearchBar from './Search_Bar'
import { Container } from 'semantic-ui-react';


class Main extends Component {
  render() {
    return(
      <Container>
        <h1>Main.js</h1>
        <div>
        <SearchBar />
        </div>
        <div>
          <Graph />
        </div>
      </Container>
    )
  }
}

export default Main;
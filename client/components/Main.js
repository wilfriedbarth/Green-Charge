import React, { Component } from 'react';
import { Link } from 'react-router';
import Graph from './Graph';
import { Container } from 'semantic-ui-react';

class Main extends Component {
  render() {
    return(
      <Container>
        <h1>Main.js</h1>
        <div>
          <Graph/>
        </div>
      </Container>
    )
  }
}

export default Main;
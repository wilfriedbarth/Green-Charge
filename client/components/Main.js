import React, { Component } from 'react';
import Graph from './Graph';
import SearchBar from './Search_Bar';
import Signin from './Signin';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    }
  }

  componentWillMount() {
    if(localStorage.getItem('accessToken')) {
      this.setState({'authenticated': true}); 
    } else {
      this.setState({'authenticated': false});
    }
  }

  render() {
    return(
        <div>
          <SearchBar />
          <Graph />
          {!this.state.authenticated &&
          <Signin />
          }
        </div>
    )
  }
}

export default Main;
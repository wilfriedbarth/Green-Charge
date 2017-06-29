import React, { Component } from 'react';
import { Link } from 'react-router';


class Main extends Component {
  render() {
    return(
      <div>
        <h1>Main.js</h1>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Main;
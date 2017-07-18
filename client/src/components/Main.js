import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Graph from './Graph';
import SearchBar from './Search_Bar';
import Signin from './Signin';
import Devices from './Devices';

class Main extends Component {

  render() {
    return(
        <Grid>
          <Grid.Row>
            <Grid.Column width={13}>
              <SearchBar />
              <Graph />
            </Grid.Column>
            <Grid.Column width={3}>
              <Devices />
            </Grid.Column>
          </Grid.Row>
          {!this.props.authenticated &&
            <Signin signIn={this.props.signIn.bind(this)}/>
            }
        </Grid>
    )
  }
}

export default Main;
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Graph from './Graph';
import SearchBar from './Search_Bar';
import Signin from './Signin';
import Devices from './Devices';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      selectedCountry: ""
    }

    this.handleChangeCountry = this.handleChangeCountry.bind(this);
  }

  handleChangeCountry(country) {
    this.setState({selectedCountry: country})
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
        <Grid>
          <Grid.Row>
            <Grid.Column width={13}>
              <SearchBar selectedCountry={this.state.selectedCountry}
              handleChangeCountry={this.handleChangeCountry}/>
              <Graph selectedCountry={this.state.selectedCountry}/>
            </Grid.Column>
            <Grid.Column width={3}>
              <Devices />
            </Grid.Column>
          </Grid.Row>
          {!this.props.authenticated &&
            <Signin authenticated={this.props.authenticated} signIn={this.props.signIn.bind(this)}/>
            }
            test: {this.state.selectedCountry}
        </Grid>
    )
  }
}

export default Main;
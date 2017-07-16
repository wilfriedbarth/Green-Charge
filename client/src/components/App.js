// Dependencies
import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// pull in components 
import AuthModal_Navbar from './AuthModal_Navbar';
import Main from './Main';
import Account from './Account';

// export the app with routes 
class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ authenticated: true });
    }
  }

  render() {
    const { authenticated } = this.state;
     
    return (
      <Router>
        <div>
          <AuthModal_Navbar authenticated={authenticated} />
          <Container>
            <Switch>
              <Route exact path='/' component={Main} />
              <Route exact path='/account' component={Account} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}
 
export default App;

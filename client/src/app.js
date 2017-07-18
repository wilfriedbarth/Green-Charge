// Dependencies
import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// pull in components 
import Main from './components/Main';
import Navbar from './components/Navbar';
import Signout from './components/Signout';
import Signup from './components/Signup';

// export the routes 
class App extends Component {

  componentWillMount() {
    if(localStorage.getItem('accessToken')) {
      this.setState({'authenticated': true}); 
    } else {
      this.setState({'authenticated': false});
    }
  }

  // update authenticated status and re-render children as needed when user signs out via navbar button 
  signOut() {
    this.setState({'authenticated': false});
  }

  signIn() {
    this.setState({'authenticated': true});
  }

  render() {
    return(
      <Router>
        <div> 
          <Navbar authenticated={this.state.authenticated} />
          <Container>
            <Switch>
              <Route exact path='/' render={(props) => (
                  <Main {...props} authenticated={this.state.authenticated} signIn={this.signIn.bind(this)} />
                )}/>
              <Route exact path='/signout' render={(props) => (
                  <Signout {...props} signOut={this.signOut.bind(this)} />
                )}/>
              <Route exact path='/signup' component={Signup}/>
            </Switch>
          </Container>
        </div>
      </Router>
      );
    }
}
 
export default App;

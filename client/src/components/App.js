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

// pull in actions
import { signUp, signIn } from '../actions/api';

// export the app with routes 
class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ authenticated: true });
      console.log(this);
      console.log(this.state.authenticated);
    } else {
      this.setState({ authenticated: false });
    }
  }

  handleSignUp({ email, password }) {
    signUp({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        this.setState({ authenticated: true })
      });
  }

  handleSignIn({ email, password }) {
    signIn({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        this.setState({ authenticated: true })
      });
  }

  handleSignOut() {
    localStorage.removeItem('token');
    this.setState({ authenticated: false });
  }

  render() {
    const { authenticated } = this.state;
     
    return (
      <Router>
        <div>
          <AuthModal_Navbar
            authenticated={authenticated}
            handleSignUp={this.handleSignUp}
            handleSignIn={this.handleSignIn}
          />
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

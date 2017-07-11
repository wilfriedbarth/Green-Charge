// Dependencies
import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// pull in components 
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

// export the routes 
const App = (
  <Router>
    <div>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route exact path='/signin' component={Signin}/>
          <Route exact path='/signup' component={Signup}/>
        </Switch>
      </Container>
    </div>
  </Router>
)
 
export default App;

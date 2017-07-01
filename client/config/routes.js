// Dependencies
import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

// pull in components 
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import Signin from '../components/Signin';

// export the routes 
const App = (
  <Router>
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/signin' component={Signin}/>
      </Switch>
    </div>
  </Router>
)
 
export default App;

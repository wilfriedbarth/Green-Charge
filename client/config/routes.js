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
import Graph from '../components/Graph';

// export the routes 
const App = (
  <Router>
    <div>
      <Route exact path='/' component={Main}/>
      <Route path='/graph' component={Graph}/>
    </div>
  </Router>
)
 
export default App;

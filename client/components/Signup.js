import React, { Component } from 'react';
import { Form, Button, Segment, Label, Divider } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      pwd: ""
    }
  }

  // respond to user input
  updateUser(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    authCaller.newUser(this.state);
    // axios post to get JWT 
    // TODO clear input field after submitting  
  }
  render() {
    return(
      <div>
      <Segment attached='top' raised>
        <Label color='orange' size='big' ribbon>Sign Up</Label>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit.bind(this)}> 
          <Form.Field required>
            <label>Email</label>
            <input id='email' placeholder='johnsmith@gmail.com' onChange={this.updateUser.bind(this)} />
          </Form.Field>
          <Form.Field required>
            <label>Password</label>
            <input id='pwd' type='password' onChange={this.updateUser.bind(this)}/>
          </Form.Field>
          <Button size='large' type='submit' color='grey'>Register</Button>
        </Form>
      </Segment>
      <Segment attached='bottom' raised>
        <Label color='green' ribbon>Already a User?</Label>
        <Button as={NavLink} to="/signin" size='small'>Sign In</Button>
      </Segment>
      </div>
    )
  }
}

export default Signup;
import React, { Component, PropTypes } from 'react';
import { Form, Button, Segment, Label, Divider, Message, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import authCaller from '../actions/auth.js';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      duplicateUser: false
    }
  }

  // respond to user input
  updateUser(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    // axios post to get JWT and save to local storage
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    authCaller.newUser(user)
    .then(function() {
      //redirect to home if successful
      this.props.history.push('/');
    }.bind(this))
    .catch(function(error) {
      // if error signing up (email exists: 500)
      // display alert by updating state
      this.setState({duplicateUser: true});
      // clear form inputs
      document.getElementById('signupForm').reset();
    }.bind(this));;
  }
  render() {
    if(this.state.authenticated) {
      return (<Redirect to='/' />)
    }
    return(
      <div>
      {this.state.duplicateUser && 
      <Message warning attached>
        <Icon name='warning' />
          Email address already exists. Try signing in as an existing user. 
      </Message>
      }
      <Segment attached raised>
        <Label color='orange' size='big' ribbon>Sign Up</Label>
        <Divider hidden />
        <Form id="signupForm" onSubmit={this.handleSubmit.bind(this)}> 
          <Form.Field required>
            <label>Email</label>
            <input id='email' placeholder='johnsmith@gmail.com' onChange={this.updateUser.bind(this)} />
          </Form.Field>
          <Form.Field required>
            <label>Password</label>
            <input id='password' type='password' onChange={this.updateUser.bind(this)}/>
          </Form.Field>
          <Button size='large' type='submit' color='grey'>Register</Button>
        </Form>
      </Segment>
      <Segment attached='bottom' raised>
        <Label color='green' ribbon>Already a User?</Label>
        <Button as={NavLink} to="/" size='small'>Sign In</Button>
      </Segment>
      </div>
    )
  }
}

export default Signup;
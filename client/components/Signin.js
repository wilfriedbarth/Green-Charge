import React, { Component, PropTypes } from 'react';
import { Form, Button, Segment, Label, Divider, Modal, Message, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import authCaller from './utils/auth.js';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      modalOpen: true,
      badLogin: false
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
        // axios post to get JWT 
    authCaller.signIn({
      email: this.state.email, 
      password: this.state.password
    })
    .then(function() {
      // modal closed
      this.setState({modalOpen: false});
    }.bind(this))
    .catch(function(error) {
      // if error logging in (invalid email or password) 
      // display alert by updating state
      this.setState({badLogin: true});
      // clear form inputs
      document.getElementById('loginForm').reset();
    }.bind(this));
  }

  render() {
    return(
      <Modal id='signin' basic closeOnDimmerClick={false} closeOnEscape={false} dimmer={'blurring'} open={this.state.modalOpen}>
        <Modal.Content>
        {this.state.badLogin && 
        <Message negative attached>
          <Icon name='warning' />
            Invalid email or password. Try logging in again or register as a new user.
        </Message>
          }
        <Segment attached raised>
          <Label color='green' size='big' ribbon>Sign In</Label>
          <Divider hidden />
          <Form id='loginForm 'onSubmit={this.handleSubmit.bind(this)}> 
            <Form.Field required>
              <label>Email</label>
              <input id='email' placeholder='johnsmith@gmail.com' onChange={this.updateUser.bind(this)} />
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <input id='password' type='password' onChange={this.updateUser.bind(this)}/>
            </Form.Field>
            <Button type='submit' color='grey' size='large'>Sign In</Button>
          </Form>
        </Segment>
        <Segment attached='bottom' raised>
          <Label color='orange' ribbon>New User?</Label>
          <Button as={NavLink} to="/signup" size='small'>Sign Up</Button>
        </Segment>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Signin;
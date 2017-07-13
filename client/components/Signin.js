import React, { Component, PropTypes } from 'react';
import { Form, Button, Segment, Label, Divider, Modal } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import authCaller from './utils/auth.js';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      modalOpen: true,
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
    }).then(function() {
      // modal closed
      this.setState({modalOpen: false});
      //redirect to home if successful
      this.props.history.push('/');
    }.bind(this));
  }

  render() {
    return(
      <Modal id='signin' basic closeOnDimmerClick={false} closeOnEscape={false} dimmer={'blurring'} open={this.state.modalOpen}>
        <Modal.Content>
        <Segment attached='top' raised>
          <Label color='green' size='big' ribbon>Sign In</Label>
          <Divider hidden />
          <Form onSubmit={this.handleSubmit.bind(this)}> 
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
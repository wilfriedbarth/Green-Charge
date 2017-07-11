import React, { Component } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Signup extends Component {
  render() {
    return(
      <div>
      <h1>Sign Up</h1>
      <Form>
        <Form.Field required>
          <label>Email</label>
          <input placeholder='johnsmith@gmail.com' />
        </Form.Field>
        <Form.Field required>
          <label>Password</label>
          <input type='password' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
      <h4>Already a User?</h4><Button as={NavLink} to="/signin">Sign In</Button>
      </div>
    )
  }
}

export default Signup;
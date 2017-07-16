import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Modal, Form, Button, Message } from 'semantic-ui-react';
import { signUp, signIn } from '../actions/api'

class AuthModal_Navbar extends Component {
  constructor(props) {
    super(props);
     
    this.state = {
      signUp: false,
      open: false,
      email: '',
      password: ''
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleSignInOrUp = this.toggleSignInOrUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.authenticated) {
      this.setState({ open: true });
    }
  }

  handleOpen() {
    this.setState({ open: true, email: '', password: '' });
  }

  handleClose() {
    this.setState({ open: false, email: '', password: '', signUp: false });
  }

  toggleSignInOrUp() {
    if (this.state.signUp) {
      this.setState({ signUp: false });
    } else {
      this.setState({ signUp: true });
    }
  }

  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (this.state.signUp) {
      signUp({ email, password })
    } else {
      signIn({ email, password })
    }
    this.setState({ open: false, email: '', password: '' });
  }

  render() {
    const { signUp, open, email, password } = this.state;

    const modalHeader = signUp ?
      <Modal.Header>Please Sign Up</Modal.Header>:
      <Modal.Header>Please Sign In</Modal.Header>;

    const signInOrUpToggle = signUp ?
      <Message>Already Registered? <a onClick={this.toggleSignInOrUp}>Sign In!</a></Message>:
      <Message>New User? <a onClick={this.toggleSignInOrUp}>Sign Up!</a></Message>;
     
    const submitButton = signUp ?
      <Button primary onClick={this.handleSubmit}>Sign Up</Button>:
      <Button primary onClick={this.handleSubmit}>Sign In</Button>;

    return (
      <div>
        <Menu>
          <Menu.Item header>Green Charge</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item name="Home" as={NavLink} to="/" />
            <Menu.Item name="Sign In" onClick={this.handleOpen} />;
          </Menu.Menu>
        </Menu>
        <Modal size='small' open={open} onClose={this.handleClose}>
          {modalHeader}
          <Modal.Content>
            <Form>
              <Form.Input
                name="email"
                label="Enter email"
                type="email"
                value={email}
                onChange={this.handleChange}
              />
              <Form.Input
                name="password"
                label="Enter password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
              {signInOrUpToggle}
            </Form>
          </Modal.Content>
          <Modal.Actions>
            {submitButton}
            <Button onClick={this.handleClose}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default AuthModal_Navbar;

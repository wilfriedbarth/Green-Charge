import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import authCaller from './utils/auth.js';

class Signout extends Component {

  componentWillMount(event) {
    authCaller.signOut();
    console.log('here');
    //redirect to home if successful
    this.props.history.push('/');
  }

  render() {
    return null
  }
}

export default Signout;
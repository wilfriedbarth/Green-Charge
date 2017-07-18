import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import authCaller from '../actions/auth.js';

class Signout extends Component {

  componentWillMount(event) {
    authCaller.signOut();
    //redirect to home if successful
    this.props.history.push('/');
  }

  render() {
    return null
  }
}

export default Signout;
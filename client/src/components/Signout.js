import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import authCaller from '../actions/auth.js';

class Signout extends Component {

  componentWillMount(event) {
    this.props.signOut(); // change auth status in App component
    authCaller.signOut();
    //redirect to home if successful
    this.props.history.push('/');
  }

  render() {
    return null
  }
}

export default Signout;
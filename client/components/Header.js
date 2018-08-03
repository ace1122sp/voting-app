import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const UserHeader = props => {
  const signOut = () => {
    props.signOut();
  }

  return (
    <nav>
      <NavLink to='/new-pool'>+ new pool</NavLink>
      {' | '}
      <NavLink to='/'>world</NavLink>
      {' | '}
      <NavLink to='/profile'>profile</NavLink>
      {' | '}
      <NavLink to='/settings'>settings</NavLink>
      {' | '}
      <button onClick={signOut}>Sign Out</button>
    </nav>
  );
}

const GuestHeader = props => {
  return (
    <nav>
      <NavLink to='/'>world </NavLink>
      {' | '}
      <NavLink to='/auth/sign_in'>sign in </NavLink>
      {' | '}
      <NavLink to='/auth/sign_up'>sign up </NavLink>
    </nav>
  );
}

class Header extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.user !== this.props.user;
  }

  render () {
    let user = this.props.user == null ? false : true;
    const headerToRender= user ? <UserHeader signOut={this.props.signOut_f} /> : <GuestHeader />;
    return (
      <header>
        <h3>voting-app</h3>
        {headerToRender}
      </header>
    );
  }
}

module.exports = Header;

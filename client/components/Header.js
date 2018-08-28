import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../style/Header.css';

const UserHeader = props => {
  const signOut = () => {
    props.signOut();
  }

  const username = props.username; // TODO napisi funkciju koja skracuje dugacka imena i prikazuje samo deo uz 3 tacke

  return (
    <nav>
      <NavLink to='/new-pool'>+ new pool</NavLink>
      {' | '}
      <NavLink to='/'>world</NavLink>
      {' | '}
      <NavLink to='/profile'>{username}</NavLink>
      {' | '}
      <NavLink to='/settings'>settings</NavLink>
      {' | '}
      <button id='sign-out-btn' onClick={signOut}>Sign Out</button>
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
  shouldComponentUpdate(nextProps) {
    return nextProps.user !== this.props.user;
  }

  render () {
    let user = this.props.user == null ? false : true;
    const headerToRender= user ? <UserHeader username={this.props.user.username} signOut={this.props.signOut_f} /> : <GuestHeader />;
    return (
      <header className='stripes'>
        <h1>voting-app</h1>
        {headerToRender}
      </header>
    );
  }
}

module.exports = Header;

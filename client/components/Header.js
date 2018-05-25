import React from 'react';
import { NavLink } from 'react-router-dom';

const UserHeader = props => {
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
      <NavLink to='#'>sign out</NavLink>
    </nav>
  );
}

const GuestHeader = props => {
  return (
    <nav>
      <NavLink to='/'>world </NavLink>
      <NavLink to='/sign-in'>sign in </NavLink>
      <NavLink to='/sign-up'>sign up </NavLink>
    </nav>
  );
}


const Header = () =>
  <header>
    <h3>voting-app</h3>
    <UserHeader />
  </header>

module.exports = Header;

import React from 'react';
import { NavLink } from 'react-router-dom';

let auth = false;

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
      <NavLink to='/auth/sign-in'>sign in </NavLink>
      <NavLink to='/auth/sign-up'>sign up </NavLink>
    </nav>
  );
}



const Header = () => {
  const HeaderToRender = auth ? <UserHeader /> : <GuestHeader />
  return (
    <header>
      <h3>voting-app</h3>
      {HeaderToRender}
    </header>
  );
}


module.exports = Header;

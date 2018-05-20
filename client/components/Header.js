import React from 'react';

const UserHeader = props => {
  return (
    <nav>
      <a href='#'>+ new pool </a>
      <a href='#'>world </a>
      <a href='#'>profile </a>
      <a href='#'>settings </a>
      <a href='#'>sign out </a>
    </nav>
  );
}

const GuestHeader = props => {
  return (
    <nav>
      <a href='#'>world </a>
      <a href='#'>sign in </a>
      <a href='#'>sign up </a>
    </nav>
  );
}


const Header = () =>
  <header>
    <h3>voting-app</h3>
    <UserHeader />
  </header>

module.exports = Header;

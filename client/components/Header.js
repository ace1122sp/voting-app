import React from 'react';

const UserHeader = props => {}

const GuestHeader = props => {
  return (
    <ul>
      <li><a href='#'>world</a></li>
      <li><a href='#'>sign in</a></li>
      <li><a href='#'>sign up</a></li>
    </ul>
  );
}


const Header = () =>
  <header>
    <h3>voting-app</h3>
    <GuestHeader />
  </header>

module.exports = Header;

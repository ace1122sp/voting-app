import React from 'react';
import { NavLink } from 'react-router-dom';

const ServerError = props => {
  props.endLoadingPool_f();
  return (
    <main>
      <h2>Snap, something went wrong...</h2>
      <NavLink to='/home'>Go Back To Home</NavLink>
    </main>
  );
}

export default ServerError;
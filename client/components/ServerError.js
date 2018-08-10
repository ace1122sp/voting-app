import React from 'react';
import { NavLink } from 'react-router-dom';

const ServerError = props => {
  props.endLoadingPool_f();
  return (
    <main>
      <h1>Snap, something went wrong...</h1>
      <NavLink to='/home'>Go Back To Home</NavLink>
    </main>
  );
}

export default ServerError;
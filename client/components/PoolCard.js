import React from 'react';
import { NavLink } from 'react-router-dom';

const PoolCard = props => {
  return (
    <div>
      <NavLink to={`/pools/${props.id}`}>{props.name}</NavLink>
    </div>
  );
}

export default PoolCard;

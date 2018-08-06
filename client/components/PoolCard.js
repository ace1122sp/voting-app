import React from 'react';
import { Link } from 'react-router-dom';

const PoolCard = props => {
  return (
    <div>
      <Link to={`/pools/${props.id}`}>{props.name}</Link>
    </div>
  );
}

export default PoolCard;

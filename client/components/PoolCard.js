import React from 'react';
import { Link } from 'react-router-dom';

const PoolCard = props => {
  return (
    <div>
      <Link to={`/pools/${props._id}`}>{props.name}</Link>
    </div>
  );
}

export default PoolCard;

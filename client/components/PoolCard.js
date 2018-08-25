import React from 'react';
import { Link } from 'react-router-dom';

const PoolCard = props => <Link to={`/pools/${props.id}`}>{props.name}</Link>

export default PoolCard;

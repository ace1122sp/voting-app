import React from 'react';
import PoolCard from './PoolCard';
import { general } from '../util/general';

const World = props => {
  if (props.poolToDelete) props.deletePool_f();

  const poolsArr = general.getPropsInArray(props.poolCards);
  const pools = poolsArr.map(pool => <PoolCard key={pool._id} id={pool._id} name={pool.name} />);

  const handleGettingPoolCards = () => {
    if (props.poolCards.length < 1) {
      props.getPoolCards_f(0);
    }
  }

  return (
    <div>
    {handleGettingPoolCards()}
      <ul>
        {pools}
      </ul>
      <button>load more polls...</button>
  </div>
  );
}


export default World;

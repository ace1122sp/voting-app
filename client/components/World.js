import React from 'react';
import PoolCard from './PoolCard';
import { general } from '../util/general';

const World = props => {
  if (props.poolToDelete) props.deletePool_f();

  const poolsArr = general.getPropsInArray(props.poolCards);
  const pools = poolsArr.map(pool => <PoolCard key={pool._id} id={pool._id} name={pool.name} />);

  // need to work on this implementation
  const handleGettingPoolCards = () => {
      props.getAdditionalPoolCards_f(10);
  }
  return (
    <div>
      <ul>
        {pools}
      </ul>
      <button onClick={handleGettingPoolCards}>load more polls...</button>
  </div>
  );
}

export default World;

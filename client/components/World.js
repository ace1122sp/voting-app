import React from 'react';
import PoolCard from './PoolCard';
import { general } from '../util/general';

const World = props => {
  if (props.poolToDelete) props.deletePool_f(props.poolToDelete);

  const poolsArr = general.getPropsInArray(props.pools);
  const pools = poolsArr.map(pool => <PoolCard key={pool.id} id={pool.id} name={pool.name} />);

  return (
    <div>
      <ul>
        {pools}
      </ul>
      <button>load more polls...</button>
  </div>
  );
}


export default World;

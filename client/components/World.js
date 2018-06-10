import React from 'react';
import PoolCard from './PoolCard';

const World = props => {
  console.log(props.pools);
  const poolsArr = [];
  for (let pool in props.pools) {
    poolsArr.push(props.pools[pool]);
  }
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

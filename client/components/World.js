import React from 'react';

import PoolCard from './PoolCard';
import Loading from './Loading';

const World = props => {
  let lastPoolId = '';
  const poolCount = props.poolCards.length;

  if (props.poolToDelete) props.deletePool_f();
  if (poolCount) {
    lastPoolId = props.poolCards[poolCount - 1]._id;
  }

  const pools = props.poolCards.map(pool => <PoolCard key={pool._id} id={pool._id} name={pool.name} />);

  // need to work on this implementation
  const handleGettingPoolCards = () => {
    props.getAdditionalPoolCards_f(lastPoolId);
  }

  if (props.fetching) return <Loading />;

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

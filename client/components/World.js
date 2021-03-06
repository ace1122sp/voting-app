import React from 'react';

import InlineLoading from './InlineLoading';
import PoolCard from './PoolCard';

const World = props => {
  let lastPoolId = '';
  const poolCount = props.poolCards.length;

  if (props.poolToDelete) props.deletePool_f();
  if (poolCount) {
    lastPoolId = props.poolCards[poolCount - 1]._id;
  }

  const pools = props.poolCards.map(pool => <li className='pool-card' key={pool._id}><PoolCard id={pool._id} name={pool.name} /></li>);

  const handleGettingPoolCards = () => {
    props.getAdditionalPoolCards_f(lastPoolId);
  }

  return (
    <main>
      <ul>
        {pools}
      </ul>
      {props.fetching && <InlineLoading />}
      <br />
      <button className='aggressive-btn' onClick={handleGettingPoolCards}>Load More Polls</button>
    </main>
  );
}

export default World;

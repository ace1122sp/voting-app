import { URL_POOLS, urlPool, urlVote, urlFollowers, urlAddOption, urlRemoveOption } from '../../resources/urls';
import { schedulePoolForDelete } from '../scheduleForDelete';
import { loadPool, removeFollower, loadPoolCards, addFollower, unloadPool } from '../pools';
import { followPool, unfollowPool, addToCreatedPools, removeFromCreatedPools } from '../user';

export const fetchPoolCards = () =>
  dispatch => {
    return fetch(URL_POOLS)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad request');
      })
      .then(poolCards => {
        // if it returns an object ---> you need to convert it to an arr
        dispatch(loadPoolCards(poolCards));
      })
      .catch(err => {
        // send some info about err to user 
        console.error(err.message);
      });
  }

export const fetchNewPool = pool =>
  dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify(pool),
      headers: { 'Content-Type': 'application/json' }
    };
    return fetch(URL_POOLS, options)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad request');
      })
      .then(pool => {
        let poolCard = { 
          _id: pool._id, 
          name: pool.name 
        };
        dispatch(addToCreatedPools(poolCard));
        dispatch(loadPool(pool));
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchPool = poolId =>
  dispatch => {
    dispatch(unloadPool());
    return fetch(urlPool(poolId))
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad request');
      })
      .then(pool => {
        dispatch(loadPool(pool));
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchPoolDelete = poolId =>
  dispatch => {
    const options = {
      method: 'DELETE'
    };
    return fetch(urlPool(poolId), options)
      .then(res => {
        if (res.ok) {
          dispatch(schedulePoolForDelete(true));
          dispatch(removeFromCreatedPools(poolId));
        } else {
          throw new Error('Bad request');
        }
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchVote = (poolId, optionId) =>
  dispatch => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        optionId
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    return fetch(urlVote(poolId), options)
      .then(res => {
        if (res.ok) {
          dispatch(optionId);
        } else {
          throw new Error('Bad request');
        }
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchFollow = (poolId, poolName, username) =>
  dispatch => {
    const options = {
      method: 'PATCH'
    };
    return fetch(urlFollowers(poolId), options)
      .then(res => {
        if (res.ok) {
          let poolCard = { _id: poolId, name: poolName };
          dispatch(followPool(poolCard));
          dispatch(addFollower(username));
        } else {
          throw new Error('Bad request');
        }
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchUnfollow = (poolId, username) =>
  dispatch => {
    const options = {
      method: 'DELETE'
    };
    return fetch(urlFollowers(poolId), options)
      .then(res => {
        if (res.ok) {
          dispatch(removeFollower(poolId, username));
          dispatch(unfollowPool(poolId));
        } else {
          throw new Error('Bad request');
        }
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchOptionAdd = (poolId, option) =>
  dispatch => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        id: option.id,
        value: option.value
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    return fetch(urlAddOption(poolId), options)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad request');
      })
      .then(pool => {
        dispatch(loadPool(pool));
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchOptionRemove = (poolId, optionId) =>
  dispatch => {
    const options = {
      method: 'DELETE'
    };
    return fetch(urlRemoveOption(poolId, optionId), options)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad request');
      })
      .then(pool => {
        dispatch(loadPool(pool));
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }
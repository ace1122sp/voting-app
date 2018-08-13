import { URL_POOLS, urlPool, urlVote, urlFollowers, urlAddOption, urlRemoveOption } from '../../resources/urls';
import { schedulePoolForDelete } from '../scheduleForDelete';
import { loadPool, unloadPool, vote, addOption, removeOption, loadInitPoolCards, loadAdditionalPoolCards } from '../pools';
import { followPool, unfollowPool, addToCreatedPools, removeFromCreatedPools } from '../user';

export const fetchPoolCards = (offset, action) =>
  dispatch => {
    const url = `${URL_POOLS}?offset=${offset}`;
    return fetch(url, { mode: 'cors', credentials: 'include' })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad request');
      })
      .then(poolCards => {
        dispatch(action(poolCards));
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
      mode: 'cors', credentials: 'include',
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
    return fetch(urlPool(poolId), { mode: 'cors', credentials: 'include' })
      .then(res => {
        if (res.ok) return res.json();
        if (res.status == 410) {
          dispatch(unloadPool());
          return Promise.resolve('deleted');
        }
      })
      .then(pool => {
        return Promise.resolve(dispatch(loadPool(pool)));
      })
      .catch(err => {
        console.error('Something went wrong');
        return Promise.reject('Something went wrong');
      });
  }

export const fetchPoolDelete = poolId =>
  dispatch => {
    const options = {
      method: 'DELETE',
      mode: 'cors', credentials: 'include'
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
      mode: 'cors', credentials: 'include',
      body: JSON.stringify({
        optionId
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    return fetch(urlVote(poolId), options)
      .then(res => {
        if (res.ok) {
          dispatch(vote(optionId));
        } else {
          throw new Error('Bad request');
        }
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchFollow = (poolId, poolName) =>
  dispatch => {
    const options = {
      method: 'PATCH',
      mode: 'cors', credentials: 'include'
    };
    return fetch(urlFollowers(poolId), options)
      .then(res => {
        if (res.ok) {
          let poolCard = { _id: poolId, name: poolName };
          dispatch(followPool(poolCard));
        } else {
          throw new Error('Bad request');
        }
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchUnfollow = poolId =>
  dispatch => {
    const options = {
      method: 'DELETE',
      mode: 'cors', credentials: 'include'
    };
    return fetch(urlFollowers(poolId), options)
      .then(res => {
        if (res.ok) {
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
      mode: 'cors', credentials: 'include',
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
      .then(res => {
        if (res.nModified) dispatch(addOption(option));
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchOptionRemove = (poolId, optionId) =>
  dispatch => {
    const options = {
      method: 'DELETE',
      mode: 'cors', credentials: 'include'
    };
    return fetch(urlRemoveOption(poolId, optionId), options)
      .then(res => {
        if (res.ok) {
          dispatch(removeOption(optionId));
        } else {
          throw new Error('Bad request');
        }
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }
import { URL_POOLS, urlPool, urlVote, urlFollowers, urlAddOption, urlRemoveOption } from '../../resources/urls';
import { loadPool } from '../pool';
import { schedulePoolForDelete } from '../scheduleForDelete';
import { removeFollower, loadPoolCards } from '../pools';

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

export const fetchNewPool = package =>
  dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: package.name,
        options: package.options
      }),
      headers: { "Content-type": "application/json" }
    };
    return fetch(URL_POOLS, options)
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

export const fetchPool = poolId =>
  dispatch => {
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
      headers: { "Content-type": "application/json" }
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

export const fetchFollow = (poolId, username) =>
  dispatch => {
    const options = {
      method: 'PATCH'
    };
    return fetch(urlFollowers(poolId), options)
      .then(res => {
        if (res.ok) {
          dispatch(poolId, username);
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
        } else {
          throw new Error('Bad request');
        }
      })
      .catch(err => {
        // send some info about err to user
        console.error(err.message);
      });
  }

export const fetchOptionAdd = (poolId, package) =>
  dispatch => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        id: package.id,
        value: package.value
      }),
      headers: { "Content-type": "application/json" }
    };
    return fetch(urlAddOptions(poolId), options)
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
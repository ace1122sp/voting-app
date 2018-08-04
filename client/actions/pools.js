import { LOAD_POOL, UNLOAD_POOL, ADD_VOTE, ADD_FOLLOWER, REMOVE_FOLLOWER } from '../constants';

export const loadPool = pool => {
  return {
    type: LOAD_POOL,
    pool
  }
}

export const unloadPool = () => {
  return {
    type: UNLOAD_POOL
  }
}

export const vote = optionId => {
  return {
    type: ADD_VOTE,
    optionId
  }
}

export const addFollower = (poolId, username) => {
  return {
    type: ADD_FOLLOWER,
    poolId,
    username
  }
}
// think about follower solutions
export const removeFollower = (poolId, username) => {
  return {
    type: REMOVE_FOLLOWER,
    poolId,
    username
  }
}

// maybe addOption(option) removeOption(optionId)
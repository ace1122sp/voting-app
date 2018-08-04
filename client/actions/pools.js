import { LOAD_POOL_CARDS, LOAD_POOL, UNLOAD_POOL, ADD_VOTE, ADD_FOLLOWER, REMOVE_FOLLOWER } from '../constants';

export const loadPoolCards = poolCards => {
  return {
    type: LOAD_POOL_CARDS,
    poolCards
  }
}

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

export const addFollower = username => {
  return {
    type: ADD_FOLLOWER,
    username
  }
}
// think about follower solutions
export const removeFollower = username => {
  return {
    type: REMOVE_FOLLOWER,
    username
  }
}

// maybe addOption(option) removeOption(optionId)
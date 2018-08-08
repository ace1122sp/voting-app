import { LOAD_POOL_CARDS, LOAD_POOL, UNLOAD_POOL, ADD_VOTE } from '../constants';

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

// maybe addOption(option) removeOption(optionId)
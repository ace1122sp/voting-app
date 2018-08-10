import { LOAD_POOL_CARDS, LOAD_POOL, UNLOAD_POOL, ADD_VOTE, ADD_OPTION, REMOVE_OPTION, START_LOADING_POOL, END_LOADING_POOL } from '../constants';

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

export const addOption = option => {
  return {
    type: ADD_OPTION,
    option
  }
}

export const removeOption = optionId => {
  return {
    type: REMOVE_OPTION,
    optionId
  }
}

export const startLoadingPool = () => {
  return {
    type: START_LOADING_POOL
  }
}

export const endLoadingPool = () => {
  return {
    type: END_LOADING_POOL
  }
}
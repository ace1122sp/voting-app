import { LOAD_USER, UNLOAD_USER, UPDATE_USER, ADD_TO_CREATED_POOLS, REMOVE_FROM_CREATED_POOLS, FOLLOW_POOL, UNFOLLOW_POOL, UPDATE_BAD_LOGIN_STATUS } from '../constants';

export const loadUser = user => {
  return {
    type: LOAD_USER,
    user
  }
}

export const unloadUser = () => {
  return {
    type: UNLOAD_USER
  }
}

export const updateUser = message => {
  return {
    type: UPDATE_USER,
    message
  }
}

export const updateBadLoginStatus = status => {
  return {
    type: UPDATE_BAD_LOGIN_STATUS,
    status
  }
}

export const addToCreatedPools = poolCard => {
  return {
    type: ADD_TO_CREATED_POOLS,
    poolCard
  }
}

export const removeFromCreatedPools = poolId => {
  return {
    type: REMOVE_FROM_CREATED_POOLS,
    poolId
  }
}

export const followPool = poolCard => {
  return {
    type: FOLLOW_POOL,
    poolCard
  }
}

export const unfollowPool = poolId => {
  return {
    type: UNFOLLOW_POOL,
    poolId
  }
}
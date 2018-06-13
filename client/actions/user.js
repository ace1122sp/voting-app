import { CREATE_USER, DELETE_USER, CHANGE_PASSWORD, FOLLOW_POOL, UNFOLLOW_POOL, ADD_OWN_POOL, SIGN_IN, SIGN_OUT } from '../constants';

export const createUser = user => {
  return {
    type: CREATE_USER,
    user
  }
}

export const deleteUser = () => {
  return {}
}

export const changePassword = () => {
  return {}
}

export const addOwnPoolToProfile = () => {
  return {}
}

export const signIn = username => {
  return {
    type: SIGN_IN,
    username
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const followPool = (username, poolId) => {
  return {
    type: FOLLOW_POOL,
    username,
    poolId
  }
}

export const unfollowPool = (username, poolId) => {
  return {
    type: UNFOLLOW_POOL,
    username,
    poolId
  }
}

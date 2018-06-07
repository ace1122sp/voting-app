import { CREATE_USER, DELETE_USER, CHANGE_PASSWORD, FOLLOW_POOL, UNFOLLOW_POOL, ADD_OWN_POOL } from './constants';

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

export const followPool = () => {
  return {}
}

export const unfollowPool = () => {
  return {}
}

export const addOwnPoolToProfile = () => {
  return {}
}

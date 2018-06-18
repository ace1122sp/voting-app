import { CREATE_POOL, ADD_VOTE, ADD_NEW_VOTING_OPTION, ADD_FOLLOWER, REMOVE_FOLLOWER, DELETE_POOL, REMOVE_POOL_OPTION } from '../constants';

export const createPool = pool => {
  return {
    type: CREATE_POOL,
    pool
  }
}

export const vote = (pool, optionId) => {
  return {
    type: ADD_VOTE,
    pool,
    optionId
  }
}

export const addVotingOption = (pool, option) => {
  return {
    type: ADD_NEW_VOTING_OPTION,
    pool,
    option
  }
}

export const addFollower = (poolId, username) => {
  return {
    type: ADD_FOLLOWER,
    poolId,
    username
  }
}

export const removeFollower = (poolId, username) => {
  return {
    type: REMOVE_FOLLOWER,
    poolId,
    username
  }
}

export const deletePool = poolId => {
  return {
    type: DELETE_POOL,
    poolId
  }
}

// export const removePoolOption = (poolId, option) => {
//   return {
//     type: REMOVE_POOL_OPTION,
//     poolId,
//     option
//   }
// }

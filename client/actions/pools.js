import { CREATE_POOL, ADD_VOTE, ADD_NEW_VOTING_OPTION, ADD_FOLLOWER } from '../constants';

export const createPool = pool => {
  return {
    type: CREATE_POOL,
    pool
  }
}

export const vote = (pool, option) => {
  return {
    type: ADD_VOTE,
    pool,
    option
  }
}

export const addVotingOption = (pool, optionName) => {
  return {
    type: ADD_NEW_VOTING_OPTION,
    pool,
    optionName
  }
}

export const addFollower = (poolId, username) => {
  return {
    type: ADD_FOLLOWER,
    poolId,
    username
  }
}

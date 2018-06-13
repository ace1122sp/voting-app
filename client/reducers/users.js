import { CREATE_USER, DELETE_USER, CHANGE_PASSWORD, FOLLOW_POOL, UNFOLLOW_POOL } from '../constants';

const default_user = {
  id: 'na',
  username: 'ace11',
  email: 'ace@ace11.ace',
  password: '1111',
  createdPools: [],
  followingPools: []
}

export const users = (state = { 'ace11': { ...default_user } }, action) => {
  let updatedFollowingPools, updatedUser;

  switch (action.type) {
    case CREATE_USER:
      return Object.assign({}, state, {[action.user.username]: {
        id: 'n/a',
        username: action.user.username,
        email: action.user.email,
        password: action.user.password,
        createdPools: []
      }});

    case DELETE_USER:
      return state;

    case CHANGE_PASSWORD:
      return state;

    case FOLLOW_POOL:
      updatedFollowingPools = [...state[action.username].followingPools, action.poolId];
      updatedUser = Object.assign({}, state[action.username], { followingPools: updatedFollowingPools });
      return Object.assign({}, state, { [action.username]: updatedUser });

    case UNFOLLOW_POOL:
      updatedFollowingPools = state[action.username].followingPools.filter(pool => pool != action.poolId);
      updatedUser = Object.assign({}, state[action.username], { followingPools: updatedFollowingPools });
      return Object.assign({}, state, { [action.username]: updatedUser });

    default:
      return state;
  }
}

import { LOAD_USER, UNLOAD_USER, UPDATE_USER, ADD_TO_CREATED_POOLS, REMOVE_FROM_CREATED_POOLS, FOLLOW_POOL, UNFOLLOW_POOL } from '../constants';

export const user = (state = null, action) => {
  switch (action.type) {
    case LOAD_USER:
      return action.user;

    case UNLOAD_USER:
      return null;  
    
    case ADD_TO_CREATED_POOLS:
      let updatedCreatedPools = [...state.createdPools, action.poolCard];
      return Object.assign({}, state, { createdPools: updatedCreatedPools });

    case REMOVE_FROM_CREATED_POOLS:
      let updatedCreatedPools = state.createdPools.filter(pool => pool.id !== poolId);
      return Object.assign({}, state, { createdPools: updatedCreatedPools });

    case FOLLOW_POOL:
      let updatedFollowingPools = [...state.followingPools, action.poolCard];
      return Object.assign({}, state, { followingPools: updatedFollowingPools });

    case UNFOLLOW_POOL:
      let updatedFollowingPools = state.followingPools.filter(pool => pool.id !== poolId);
      return Object.assign({}, state, { followingPools: updatedFollowingPools });

    default:
      return state;
  }
}

import { CREATE_POOL, ADD_VOTE, ADD_NEW_VOTING_OPTION, ADD_FOLLOWER, REMOVE_FOLLOWER, DELETE_POOL, REMOVE_POOL_OPTION } from '../constants';

export const pools = (state = {}, action) => {
  let pool, optionId, option, updatedFollowers, updatedPool, updatedPools;
  switch (action.type) {
    case CREATE_POOL:
      return Object.assign({}, state, {[action.pool.id]: {
        id: action.pool.id,
        name: action.pool.name,
        dateCreated: action.pool.dateCreated,
        creator: action.pool.creator,
        followers: [],
        voters: '?',
        options: action.pool.options
      }});

    case ADD_VOTE:
      pool = Object.assign({}, state[action.pool]);
      pool.options[action.optionId].votes += 1;
      return Object.assign({}, state, {[action.pool]: pool});

    case ADD_NEW_VOTING_OPTION:
      pool = Object.assign({}, state[action.pool]);
      pool.options[action.option.id] = Object.assign({ id: action.option.id, value: action.option.value, votes: 0 });
      return Object.assign({}, state, {[action.pool]: pool});

    case ADD_FOLLOWER:
      updatedFollowers = [...state[action.poolId].followers, action.username];
      updatedPool = Object.assign({}, state[action.poolId], { followers: updatedFollowers });
      return Object.assign({}, state, { [action.poolId]: updatedPool });

    case REMOVE_FOLLOWER:
      updatedFollowers = state[action.poolId].followers.filter(user => user != action.username);
      updatedPool = Object.assign({}, state[action.poolId], { followers: updatedFollowers });
      return Object.assign({}, state, { [action.poolId]: updatedPool });

    case DELETE_POOL:
      updatedPools = Object.assign({}, state);
      delete updatedPools[action.poolId];
      return updatedPools;

    // case REMOVE_POOL_OPTION:
    //   pool = Object.assign({}, state[action.poolId]);
    //   delete pool.options[action.option];
    //   return Object.assign({}, state, { [action.poolId]: pool });

    default:
      return state;
  }
}

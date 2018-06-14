import { CREATE_POOL, ADD_VOTE, ADD_NEW_VOTING_OPTION, ADD_FOLLOWER, REMOVE_FOLLOWER } from '../constants';

export const pools = (state = {}, action) => {
  let pool, optionId, option, updatedFollowers, updatedPool;
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
      pool.options[action.option].votes += 1;
      return Object.assign({}, state, {[action.pool]: pool});

    case ADD_NEW_VOTING_OPTION:
      pool = Object.assign({}, state[action.pool]);
      optionId = pool.options.length;
      option = {
        id: optionId,
        option: action.optionName,
        votes: 0
      };
      pool.options.push(option);
      return Object.assign({}, state, {[action.pool]: pool});

    case ADD_FOLLOWER:
      updatedFollowers = [...state[action.poolId].followers, action.username];
      updatedPool = Object.assign({}, state[action.poolId], { followers: updatedFollowers });
      return Object.assign({}, state, { [action.poolId]: updatedPool });

    case REMOVE_FOLLOWER:
      updatedFollowers = state[action.poolId].followers.filter(user => user != action.username);
      updatedPool = Object.assign({}, state[action.poolId], { followers: updatedFollowers });
      return Object.assign({}, state, { [action.poolId]: updatedPool });

    default:
      return state;
  }
}

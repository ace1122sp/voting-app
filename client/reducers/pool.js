import { LOAD_POOL, UNLOAD_POOL, ADD_VOTE, ADD_FOLLOWER, REMOVE_FOLLOWER,  } from '../constants';

export const pool = (state = {}, action) => {
  let updatedFollowers, targetOption, updatedOptions;
  switch (action.type) {
    case LOAD_POOL:
      return action.pool;
    
    case UNLOAD_POOL:
      return Object.assign({});
    
    case ADD_VOTE: 
      targetOption = state.options.filter(option => option.id === action.optionId)[0];
      targetOption.votes += 1;
      updatedOptions = state.options.filter(option => option.id !== action.optionId);
      updatedOptions.push(targetOption);
      return Object.assign({}, state, { options: updatedOptions });
  
    case ADD_FOLLOWER:
      updatedFollowers = Object.assign({}, state.followers, { [action.username]: true });
      return Object.assign({}, state, { followers: updatedFollowers });
    
    case REMOVE_FOLLOWER:
      updatedFollowers = Object.assign({}, state.followers);
      delete updatedFollowers[action.username];
      return Object.assign({}, state, { followers: updatedFollowers });
    
    default: 
      return state
  }
}
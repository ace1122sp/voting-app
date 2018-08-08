import { LOAD_POOL, UNLOAD_POOL, ADD_VOTE } from '../constants';

export const pool = (state = {}, action) => {
  let targetOption, updatedOptions;
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
  
    default: 
      return state
  }
}
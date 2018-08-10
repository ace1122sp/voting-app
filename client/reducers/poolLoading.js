import { START_LOADING_POOL, END_LOADING_POOL } from '../constants';

export const poolLoading = (state = false, action) => {
  switch (action.type) {
    case START_LOADING_POOL:
      return true;
    
    case END_LOADING_POOL:
      return false;

    default: 
      return state;
  }
}
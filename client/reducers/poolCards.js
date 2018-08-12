import { LOAD_POOL_CARDS } from '../constants';

export const poolCards = (state = [], action) => {
  switch (action.type) {
    case LOAD_POOL_CARDS:
      // need to filter unique pool cards 
      return [...state, ...action.poolCards];

    default:
      return state;
  }
}
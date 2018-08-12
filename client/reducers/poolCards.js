import { LOAD_INIT_POOL_CARDS, LOAD_ADDITIONAL_POOL_CARDS } from '../constants';

export const poolCards = (state = [], action) => {
  switch (action.type) {
    // case LOAD_POOL_CARDS:
    //   // need to filter unique pool cards 
    //   return [...state, ...action.poolCards];

    case LOAD_INIT_POOL_CARDS:
      return action.poolCards
    
    case LOAD_ADDITIONAL_POOL_CARDS:
      // you need to make sure that there is no duplicate cards
      return [...state, action.poolCards];

    default:
      return state;
  }
}
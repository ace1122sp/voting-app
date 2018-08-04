import { LOAD_POOL_CARDS } from '../constants';

export const poolCards = (state = [], action) => {
  switch (action.type) {
    case LOAD_POOL_CARDS:
      return action.poolCards

    default:
      return state;
  }
}
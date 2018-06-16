import { SCHEDULE_POOL_FOR_DELETE } from '../constants';

export const poolToDelete = (state = null, action) => {
  switch (action.type) {
    case SCHEDULE_POOL_FOR_DELETE:
      return action.poolId;

    default:
      return state;
  }
}

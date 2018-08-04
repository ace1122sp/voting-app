import { SCHEDULE_POOL_FOR_DELETE } from '../constants';

export const poolToDelete = (state = false, action) => {
  switch (action.type) {
    case SCHEDULE_POOL_FOR_DELETE:
      return action.message;

    default:
      return state;
  }
}

import { SCHEDULE_POOL_FOR_DELETE } from '../constants';

export const schedulePoolForDelete = poolId => {
  return {
    type: SCHEDULE_POOL_FOR_DELETE,
    poolId
  }
}

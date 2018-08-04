import { SCHEDULE_POOL_FOR_DELETE } from '../constants';

export const schedulePoolForDelete = message => {
  return {
    type: SCHEDULE_POOL_FOR_DELETE,
    message
  }
}

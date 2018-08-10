import { combineReducers } from 'redux';

import { pool } from './pool';
import { poolCards } from './poolCards';
import { poolToDelete } from './poolToDelete';
import { poolLoading } from './poolLoading';
import { user } from './user';
import { userUpdateStatus } from './userUpdateStatus';

const rootReducer = combineReducers({
  pool,
  poolCards,
  poolToDelete,
  poolLoading,
  user,
  userUpdateStatus
});

export default rootReducer;
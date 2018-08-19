import { combineReducers } from 'redux';

import { pool } from './pool';
import { poolCards } from './poolCards';
import { poolToDelete } from './poolToDelete';
import { poolLoading } from './poolLoading';
import { user } from './user';
import { userUpdateStatus } from './userUpdateStatus';
import { badLoginStatus } from './badLoginStatus';
import { registerStatus } from './registerStatus';
import { fetchingRequest } from './fetchingRequest';

const rootReducer = combineReducers({
  pool,
  poolCards,
  poolToDelete,
  poolLoading,
  user,
  userUpdateStatus,
  badLoginStatus,
  registerStatus,
  fetchingRequest
});

export default rootReducer;
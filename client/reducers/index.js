import { combineReducers } from 'redux';
import { pools } from './pools';
import { poolToDelete } from './poolToDelete';
import { user } from './user';
import { userUpdateStatus } from './userUpdateStatus';

const rootReducer = combineReducers({
  pools,
  poolToDelete,
  user,
  userUpdateStatus
});

export default rootReducer;

import { combineReducers } from 'redux';
import { pools } from './pools';
import { poolToDelete } from './poolToDelete';
import { users } from './users.js';
import { activeUser } from './activeUser';

const rootReducer = combineReducers({
  pools,
  poolToDelete,
  users,
  activeUser
});

export default rootReducer;

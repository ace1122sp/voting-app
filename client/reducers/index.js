import { combineReducers } from 'redux';
import { pools } from './pools';
import { users } from './users.js';
import { activeUser } from './activeUser';

const rootReducer = combineReducers({
  pools,
  users,
  activeUser
});

export default rootReducer;

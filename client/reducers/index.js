import { combineReducers } from 'redux';
import { pools } from './pools';
import { users } from './users.js';

const rootReducer = combineReducers({
  pools,
  users
});

export default rootReducer;

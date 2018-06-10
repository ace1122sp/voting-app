import { combineReducers } from 'redux';
import { pools } from './pools';
import { users } from './users.js';
import { activeUser } from './activeUser';
import { userSignedIn } from './userSignedIn';

const rootReducer = combineReducers({
  pools,
  users,
  activeUser,
  userSignedIn
});

export default rootReducer;

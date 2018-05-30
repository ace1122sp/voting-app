import { combineReducers } from 'redux';
import { pools } from './pools';
import { user } from './user';

const rootReducer = combineReducers({
  pools,
  user
});

export default rootReducer;

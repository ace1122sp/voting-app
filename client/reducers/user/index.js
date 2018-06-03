import { combineReducers } from 'redux';
import { id } from './id';
import { username } from './username';
import { email } from './email';
import { createdPools } from './createdPools';
import { followingPools } from './followingPools';

export const user = combineReducers({
  id,
  username,
  email,
  createdPools,
  followingPools
});

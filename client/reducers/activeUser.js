import { SIGN_IN, SIGN_OUT } from '../constants';

export const activeUser = (state = null, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.username;

    case SIGN_OUT:
      return null;

    default:
      return state;
  }
}

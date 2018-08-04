import { UPDATE_USER } from '../constants';

export const userUpdateStatus = (state = null, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return action.message
    
    default:
      return state
  }
}
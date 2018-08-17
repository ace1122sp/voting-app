import { UPDATE_BAD_LOGIN_STATUS } from "../constants";

export const badLoginStatus = (state = null, action) => {
  switch (action.type) {
    case UPDATE_BAD_LOGIN_STATUS:
      return action.status;
    
    default:
      return state;
  }
}
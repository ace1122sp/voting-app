import { UPDATE_REGISTER_STATUS } from "../constants";

export const registerStatus = (state = null, action) => {
  switch (action.type) {
    case UPDATE_REGISTER_STATUS:
      return action.status;
    
    default: 
      return state;
  }
}
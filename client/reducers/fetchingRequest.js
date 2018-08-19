import { FETCHING_REQUEST } from "../constants";

export const fetchingRequest = (state = false, action) => {
  switch (action.type) {
    case FETCHING_REQUEST:
      return action.status;
    
    default: 
      return state;
  }
}
import { FETCHING_REQUEST } from '../constants';

export const fetchingRequest = status => {
  return {
    type: FETCHING_REQUEST,
    status
  }
}
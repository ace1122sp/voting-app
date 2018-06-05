import { CREATE_POOL } from './constants';

export const createPool = pool => {
  return {
    type: CREATE_POOL,
    pool
  }
}

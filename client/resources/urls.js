const URL_USER = '/api/users/';
const URL_POOL = '/api/pools/'

// user urls
export const URL_REGISTER = URL_USER + 'register';
export const URL_LOGIN = URL_USER + 'login';
export const URL_LOGOUT = URL_USER + 'logout';
export const URL_PROFILE = URL_USER;

// pool urls
export const URL_POOLS = URL_POOL;

export const url_pool = poolId => `${URL_POOL}${poolId}`
export const url_vote = poolId => `${URL_POOL}${poolId}/votes`
export const url_followers = poolId => `${URL_POOL}${poolId}/followers`
export const url_add_option = poolId => `${URL_POOL}${poolId}/options`
export const url_remove_option = (poolId, optionId) => `${URL_POOL}${poolId}/options/${optionId}`
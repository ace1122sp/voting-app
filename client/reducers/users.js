const default_user = {
  id: 'na',
  username: 'ace11',
  email: 'ace@ace11.ace',
  password: '1111',
  createdPools: [],
  followingPools: []
}

export const users = (state = {'ace11': { ...default_user }}, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return Object.assign({}, state, {[action.user.username]: {
        id: 'n/a',
        username: action.user.username,
        email: action.user.email,
        password: action.user.password
      }});

    case 'DELETE_USER':
      return state;

    case 'CHANGE_PASSWORD':
      return state;

    default:
      return state;
  }
}

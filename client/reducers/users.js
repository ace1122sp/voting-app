export const users = (state = {}, action) => {
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

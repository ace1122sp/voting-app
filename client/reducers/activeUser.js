export const activeUser = (state = null, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return action.user;

    case 'SIGN_OUT':
      return null;

    default:
      return state;
  }
}

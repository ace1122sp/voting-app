export const pools = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_POOL':
      const nameForId = action.pool.name.split(' ').filter(word => word.length > 0).join('');
      const ID = JSON.stringify(Object.keys(state).length) + nameForId;
      return Object.assign({}, state, {[ID]: {
        id: ID,
        name: action.pool.name,
        dateCreated: 'n/a',
        creatorId: 'n/a',
        followers: [],
        voters: '?',
        options: action.pool.options
      }});
    default:
      return state;
  }
}

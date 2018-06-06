export const pools = (state = {}, action) => {
  let pool, optionId, option;
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

    case 'ADD_VOTE':
      pool = Object.assign({}, state[action.pool]);
      pool.options[action.option].votes += 1;
      return Object.assign({}, state, {[action.pool]: pool});

    case 'ADD_NEW_VOTING_OPTION':
      pool = Object.assign({}, state[action.pool]);
      optionId = pool.options.length;
      option = {
        id: optionId,
        option: action.optionName,
        votes: 0
      };
      pool.options.push(option);
      return Object.assign({}, state, pool);
    default:
      return state;
  }
}

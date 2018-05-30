const defaultPool = {
  'p00': {
    id: 'p00',
    name: 'Star Wars or Star Trek',
    dateCreated: 'n/a',
    followers: [],
    options: [
      {
        id: 0,
        option: 'Star Wars',
        votes: 0
      },
      {
        id: 1,
        option: 'Star Trek',
        votes: 0
      }
    ]
  }
}

export const pools = (state= {...defaultPool}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

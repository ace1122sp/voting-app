import React from 'react';

const poolsPrototypeSample = [
  {
    id: '01a',
    name: 'Obi-Wan or Luke Skywalker',
    options : [{ id: 0, option: 'Obi-Wan Kenobi', votes: 10 }, { id: 1, option: 'Luke Skywalker', votes: 11 }],
    dateCreated: '27-5-18',
    creator: '439r53j9',
    followers: ['3rfd', 'asdfsafd433', 'f34rf4e'],
    voters: [
      { ip: 'n/a', id: 'ad3dfkj34', vote: 0 }, // for registered users it looks user's id
      { ip: 'n/a', id: 'ad3dfsj34', vote: 1 }, // for guests it looks guest's ip 
      { ip: 'n/a', id: 'adfdakj34', vote: 0 }
    ]
  },
  {
    id: '02a',
    name: 'Star Wars or Star Trek',
    options: [{ id: 0, option: 'Star Wars', votes: 113 }, { id: 1, option: 'Star Trek', votes: 211 }],
    dateCreated: '27-5-18',
    creator: '4393g3j9',
    followers: ['3rasfd', 'afsafd433', 'f34rasw'],
    voters: [
      { ip: 'n/a', id: 'ad3dfkvgr', vote: 0 }, // for registered users it looks user's id
      { ip: 'n/a', id: 'ad3dfsj34', vote: 1 }, // for guests it looks guest's ip 
      { ip: 'n/a', id: 'adfdakj55', vote: 0 }
    ]
  },
  {
    id: '03a',
    name: 'JavaScript or PHP',
    options: [{ id: 0, option: 'JavaScript', votes: 130 }, { id: 1, option: 'PHP', votes: 101 }],
    dateCreated: '27-5-18',
    creator: '439r53fsgj9',
    followers: ['3r2fd', 'asdfsafd4', '2f34rf4e'],
    voters: [
      { ip: 'n/a', id: 'ag3dfkj34', vote: 0 }, // for registered users it looks user's id
      { ip: 'n/a', id: 'sh3dfsj34', vote: 1 }, // for guests it looks guest's ip 
      { ip: 'n/a', id: 'fd4dakj34', vote: 0 }
    ]
  }
]

const World = () => {
  const pools = poolsPrototypeSample.map(pool => <li key={pool.id}>{pool.name}</li>);
  return (
    <div>
      <ul>
        {pools}
      </ul>
      <button>load more polls...</button>
  </div>
  );
}


module.exports = World;

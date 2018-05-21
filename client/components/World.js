import React from 'react';

const fakePools = [
  {
    id: 0,
    title: 'Obi-Wan Kenobi or Luke Skywalker',
    options: [{ option: 'Obi-Wan-Kenobi', votes: 10 }, { option: 'Luke Skywalker', votes: 11 }]
  },
  {
    id: 1,
    title: 'Star Wars or Star Trek',
    options: [{ option: 'Star Wars', votes: 331 }, { option: 'Star Trek', votes: 245 }]
  }
];


const World = () =>
  <div>
    <ul>
      <li>{fakePools[0].title}</li>
      <li>{fakePools[1].title}</li>
    </ul>
    <button>load more polls...</button>
  </div>


module.exports = World;

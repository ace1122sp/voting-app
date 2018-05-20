import React from 'react';

const CreatePool = props => {
  return (
    <div>
      <h2>Create Pool</h2>
      <div>
        <label>Pool Title</label><br />
        <input type='text' value='' /><br /><br />
        <div>
          <input type='text' value='option A' />
          <button>x</button>
        </div>
        <div>
          <input type='text' value='option B' />
          <button>x</button>
        </div>
      </div>
      <button>add option</button>
      <br /><br />
      <button>Submit</button>
    </div>
  );
}

module.exports = CreatePool;

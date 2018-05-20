import React from 'react';

const Pool = props => {
  return (
    <main>
      <div>
      <form>
        <p>Pool Name</p>
        <div>
          <input type='radio' id='vote-option-1' name='vote-option' value='option-1' />
          <label>Option A</label><br />
          <input type='radio' id='vote-option-2' name='vote-option' value='option-2' />
          <label>Option B</label><br />
        </div>
        <div>
          <input type='submit' value='Vote' /><br />
        </div>
      </form>
      <form>
        <p>add new option</p>
        <input type='text' value='' />
        <input type='submit' value='add' /><br />
      </form>
      <div>
        <button>follow </button>
        <button>tweet </button>
        <button>share </button>
      </div>
      </div>
      <div>
        <h4>Chart</h4>
        <p>imagine some chart over here</p>
      </div>
    </main>
  );
}

module.exports = Pool;

import React from 'react';

const Pool = props => {
  const options = props.options.map((option, index) => {
    return (
      <React.Fragment key={option.id}>
        <input type='radio' id={`vote-option-${index}`} name={`${index}_${option.option}`} value={option.option} />
        <label>{option.option}</label><br />
      </React.Fragment>
    );
  });
  console.log(props);
  return (
    <main>
      <div>
      <form>
        <p>{props.name}</p>
        <div>
          {options}
        </div>
        <input type='submit' value='Vote' /><br />
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

export default Pool;

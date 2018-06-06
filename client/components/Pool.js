import React, { Component } from 'react';
import { validator } from '../util/validator';

const showResults = resultsArray => {
  return resultsArray.map(option =>
    <div key={option.votes+option.option}>
      <strong>{option.option}: </strong>
      <span>{option.votes}</span>
    </div>
  );
}

const getOptions = (optionsArray, name) => {
  return optionsArray.map((option, index) =>
    <React.Fragment key={option.id}>
      <input type='radio' id={`vote-option-${index}`} name={name} value={option.id} />
      <label htmlFor={`vote-option-${index}`}>{option.option}</label><br />
    </React.Fragment>
  )
};

class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = { newOption: '' };
    this.handleVoting = this.handleVoting.bind(this);
    this.handleChangeForNewOption = this.handleChangeForNewOption.bind(this);
    this.handleAddingNewOption = this.handleAddingNewOption.bind(this);
  }

  handleChangeForNewOption(e) {
    this.setState({ newOption: e.target.value });
  }

  handleAddingNewOption(e) {
    e.preventDefault();

    // Validate option
    const options = this.props.options.map(el => el.option);
    const validOption = validator.trimEverything(this.state.newOption);
    const uniqueOption = validator.isUnique(validOption, options);

    if (validOption && uniqueOption) {
      this.props.addVotingOption_f(this.props.poolId, validOption);
      this.setState({ newOption: '' });
    } else {
      alert('New option can\'t be an empty string and it can\'t match some of the existing options.');
    }
  }

  handleVoting() {
    let votedOption;
    const radioInputs = document.querySelectorAll("input[type='radio']");
    radioInputs.forEach(input => {
      if (input.checked) {
        votedOption = input.value;
        this.props.vote_f(this.props.poolId, votedOption);
      }
    });
  }

  render() {
    return (
      <main>
        <div>
          <p>{this.props.name}</p>
          <div>
            {getOptions(this.props.options, this.props.name)}
          </div>
          <button onClick={this.handleVoting}>Vote</button><br />
        <form onSubmit={this.handleAddingNewOption}>
          <p>add new option</p>
          <input type='text' value={this.state.newOption} onChange={this.handleChangeForNewOption} />
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
          {showResults(this.props.options)}
        </div>
      </main>
    );
  }
}

export default Pool;

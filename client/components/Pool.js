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
    this.state = {
      newOption: ''
    };
  }

  handleChangeForNewOption = e => {
    this.setState({ newOption: e.target.value });
  }

  handleAddingNewOption = e => {
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

  handleVoting = () => {
    let votedOption;
    const radioInputs = document.querySelectorAll("input[type='radio']");
    radioInputs.forEach(input => {
      if (input.checked) {
        votedOption = input.value;
        this.props.vote_f(this.props.poolId, votedOption);
      }
    });
  }

  handleFollowing = () => {
    this.props.follow_f(this.props.username, this.props.poolId);
  }

  handleUnfollowing = () => {
    this.props.unfollow_f(this.props.username, this.props.poolId);
  }

  followOrUnfollow = () => this.props.isFollowedByActiveUser == 'unfollow' ? this.handleUnfollowing() : this.handleFollowing();

  handlePoolDelete = () => {
    this.props.schedulePoolForDelete_f(this.props.poolId);
    this.goBack();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    let deleteButton;
    const deletePool = <button onClick={this.handlePoolDelete}>delete pool</button>;
    this.props.username == this.props.creator ? deleteButton = deletePool : deleteButton = null;
    return (
      <main>
        <div>
          <h2>{this.props.name}</h2>
          <h4>created by {this.props.creator || 'n/a'} <span>{this.props.dateCreated}</span></h4>
          <div>
            {getOptions(this.props.options, this.props.name)}
          </div>
          <button onClick={this.handleVoting}>Vote</button><br />
        {this.props.username && <form onSubmit={this.handleAddingNewOption}>
          <p>add new option</p>
          <input type='text' value={this.state.newOption} onChange={this.handleChangeForNewOption} />
          <input type='submit' value='add' /><br />
        </form>}
        {this.props.username && <div>
          <button onClick={this.followOrUnfollow}>{this.props.isFollowedByActiveUser}</button>
          <button>tweet </button>
          <button>share </button>
        </div>}
        </div>
        {deleteButton}
        <div>
          <h3>Chart</h3>
          <p>imagine some chart over here</p>
          {showResults(this.props.options)}
        </div>
      </main>
    );
  }
}

export default Pool;

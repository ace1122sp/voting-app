import React, { Component } from 'react';
import { validator } from '../util/validator';

class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOption: '',
      creatorUser: this.props.username == this.props.pool.creator
    };
  }
  componentWillMount() {
    this.props.getPool_f(this.props.poolId);
  }
  handleOptionDelete = e => {
    e.preventDefault();
    if (this.state.creatorUser && this.props.pool.options.length > 2) this.props.removePoolOption_f(this.props.poolId, e.target.value);
  }

  getOptions = (optionsArray, name) =>
    optionsArray.map((option, index) =>
      <React.Fragment key={option.value}>
        <input type='radio' id={`vote-option-${index}`} name={name} value={option.id} />
        <label htmlFor={`vote-option-${index}`}>{option.value}</label>
        {this.state.creatorUser && <button value={option.id} onClick={this.handleOptionDelete}>X</button>}
        <br />
      </React.Fragment>
    );

  showResults = resultsArray =>
    resultsArray.map(option =>
      <div key={option.id}>
        <strong>{option.value}: </strong>
        <span>{option.votes}</span>
      </div>
    );

  handleChangeForNewOption = e => {
    this.setState({ newOption: e.target.value });
  }

  handleAddingNewOption = e => {
    e.preventDefault();

    // Validate option
    const options = this.props.pool.options.map(el => el.value);
    const validOption = validator.trimEverything(this.state.newOption);
    const uniqueOption = validator.isUnique(validOption, options);

    if (validOption && uniqueOption) {
      const formatedId = validOption.split(' ').join('-');
      const option = { id: formatedId, value: validOption };

      this.props.addVotingOption_f(this.props.poolId, option);
      this.setState({ newOption: '' });
    } else {
      alert('New option can\'t be an empty string and it can\'t match some of the existing options.');
    }
  }

  handleVoting = () => {
    const radioInputs = document.querySelectorAll("input[type='radio']");

    radioInputs.forEach(input => {
      if (input.checked) {
        let votedOption = input.value;
        this.props.vote_f(this.props.poolId, votedOption);
      }
    });
  }

  handleFollowing = () => {
    this.props.follow_f(this.props.poolId, this.props.pool.name, this.props.username);
  }

  handleUnfollowing = () => {
    this.props.unfollow_f(this.props.username, this.props.poolId);
  }

  followOrUnfollow = () => this.props.isFollowedByActiveUser == 'unfollow' ? this.handleUnfollowing() : this.handleFollowing();

  handlePoolDelete = () => {
    this.props.deletePool_f(this.props.poolId);
    this.goBack();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    let deleteButton;
    const deletePool = <button onClick={this.handlePoolDelete}>delete pool</button>;
    this.props.username == this.props.pool.creator ? deleteButton = deletePool : deleteButton = null;

    return (
      <main>
        <div>
          <h2>{this.props.pool.name}</h2>
          <h4>created by {this.props.pool.creator || 'n/a'} <span>{this.props.pool.dateCreated}</span></h4>
          <div>
            {this.props.pool.name && this.getOptions(this.props.pool.options, this.props.pool.name)}
          </div>
          <button onClick={this.handleVoting}>Vote</button><br />
        {this.props.pool.name && this.props.username && <form onSubmit={this.handleAddingNewOption}>
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
          {this.props.pool.name && this.showResults(this.props.pool.options)}
        </div>
      </main>
    );
  }
}

export default Pool;

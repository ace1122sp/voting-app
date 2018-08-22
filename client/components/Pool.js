import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { validator } from '../util/validator';
import Loading from './Loading';

class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOption: '',
      voted: false,
      redirect: false
    };

    this.props.getPool_f(this.props.poolId)
      .then(promise => {
        if (promise.pool == 'deleted') {
          this.handleUnfollowing();
          this.props.history.push('/no-pool');
        } else {
          return Promise.resolve(true)
        }
      })
      .then(() => {
        this.props.endLoading_f();
      })
      .catch(err => {
        this.props.history.push('/server-error');
      });     
  }

  handleOptionDelete = e => {
    e.preventDefault();
    const isAllowed = this.props.username === this.props.pool.creator;
    if (isAllowed && this.props.pool.options.length > 2) this.props.removePoolOption_f(this.props.poolId, e.target.value);
  }

  _sortOptions = (option1, option2) => {
    if (option1.value < option2.value) {
      return -1;
    } else if (option1.value > option2.value) {
      return 1;
    } else {
      return 0;
    }
  }
  
  getOptions = (optionsArray, name, creator) =>
    optionsArray.sort(this._sortOptions).map((option, index) =>
      <React.Fragment key={option.value}>
        <input type='radio' id={`vote-option-${index}`} name={name} value={option.id} />
        <label htmlFor={`vote-option-${index}`}>{option.value}</label>
        {creator && <button value={option.id} onClick={this.handleOptionDelete}>X</button>}
        <br />
      </React.Fragment>
    );

  showResults = resultsArray =>
    resultsArray.sort(this._sortOptions).map(option =>
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
        this.setState({ voted: true });
      }
    });
  }

  handleFollowing = () => {
    this.props.follow_f(this.props.poolId, this.props.pool.name);
  }

  handleUnfollowing = () => {
    this.props.unfollow_f(this.props.poolId);
  }

  followOrUnfollow = () => this.props.isFollowedByActiveUser == 'unfollow' ? this.handleUnfollowing() : this.handleFollowing();

  handlePoolDelete = () => {
    this.props.deletePool_f(this.props.poolId);
    this.setState({ redirect: true });
  }

  render() {
    if (this.props.poolLoading) return <Loading />;  

    if (this.state.redirect && !this.props.fetching) return <Redirect to='/' />;

    const isCreator = this.props.username === this.props.pool.creator;
    return (
      <main>
        <div>
          <h2>{this.props.pool.name}</h2>
          <h4>created by {this.props.pool.creator || 'n/a'} <span>{this.props.pool.dateCreated}</span></h4>
          <div>
            {this.props.pool.name && !this.state.voted && this.getOptions(this.props.pool.options, this.props.pool.name, isCreator)}
          </div>
          {!this.state.voted && <button onClick={this.handleVoting}>Vote</button>}<br/>
          {this.props.pool.name && this.props.username && !this.state.voted && <form onSubmit={this.handleAddingNewOption}>
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
        {isCreator && <button onClick={this.handlePoolDelete}>delete pool</button>}
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

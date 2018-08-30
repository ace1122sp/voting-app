import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Loading from './Loading';

import { validator } from '../util/validator';
import '../style/Pool.css';

class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOption: '',
      redirect: false,
      voted: false,
    };
  }
  
  componentWillMount() {
    this.props.getPool_f(this.props.poolId)
      .then(pool => {
        if (pool.pool == 'deleted') {
          if (this.props.username) this.handleUnfollowing();
          this.props.history.push('/no-pool');
        }
      })
      .catch(err => {
        console.log(err)
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
      <li className='voting-option' key={option.value}>
        <label>
          <input type='radio' name={name} value={option.id} />
          <span>{option.value}</span>
        </label>
        {creator && <button className='neutral-btn' value={option.id} onClick={this.handleOptionDelete}>X</button>}
      </li>
    );

  showResults = resultsArray =>
    resultsArray.sort(this._sortOptions).map(option =>
      <li key={option.id}>
        <span>{option.value}: </span>
        {option.votes}
      </li>
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
    if (this.props.fetching) return <Loading />;  

    if (this.state.redirect) return <Redirect to='/' />;

    const isCreator = this.props.username === this.props.pool.creator;
    return (
      <main className='wrapper wrap-space-around'>
        <section className='pool-section pool-shadow'>
          <h2>{this.props.pool.name}</h2>
          <address>created by {this.props.pool.creator || 'n/a'} <time>{this.props.pool.dateCreated}</time></address>
          {this.props.pool.name && !this.state.voted && <ul className='options-list'>{this.getOptions(this.props.pool.options, this.props.pool.name, isCreator)}</ul>}
          {!this.state.voted && <button className='aggressive-btn' onClick={this.handleVoting}>Vote</button>}
          <br /><br />
          {this.props.pool.name && this.props.username && !this.state.voted && <form onSubmit={this.handleAddingNewOption}>
            <input type='text' value={this.state.newOption} onChange={this.handleChangeForNewOption} />
            <button className='add-neutral-btn'>Add New Option</button>
            <br /><br />
          </form>}
        </section>
        <br />
        <div className='handle-pool'>
          {this.props.username && <div>
            <button className='neutral-btn social-btn-sizes' onClick={this.followOrUnfollow}>{this.props.isFollowedByActiveUser}</button>
            <button className='neutral-btn social-btn-sizes'>tweet </button>
            <button className='neutral-btn social-btn-sizes'>share </button>
          </div>}
        {isCreator && <button className='danger-btn' onClick={this.handlePoolDelete}>Delete Pool</button>}
        </div>
        <section className='pool-section'>
          <h3>Chart</h3>
          <p>imagine some chart over here</p>
          {this.props.pool.name && <ul className='options-list'>{this.showResults(this.props.pool.options)}</ul>}
        </section>
      </main>
    );
  }
}

export default Pool;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'chart.js';

import { validator } from '../util/validator';
import { general } from '../util/general';

import '../style/Pool.css';

import Loading from './Loading';

class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOption: '',
      invalidOption: false,
      redirect: false,
      voted: false,
      dateCreated: 'na',
      init: false // temp solution
    };
  }
  
  componentWillMount() {
    this.props.getPool_f(this.props.poolId)
      .then(pool => {
        if (pool.pool == 'deleted') {
          if (this.props.username) this.handleUnfollowing();
          this.props.history.push('/no-pool');
        }
        this.createChart();
        this.setState({ init: true, dateCreated: general.formatMongooseDate(this.props.pool.dateCreated) }); // temp solution
      })
      .catch(err => {
        console.log(err)
        this.props.history.push('/server-error');
      });     
  }

  componentDidUpdate() { // temp solution
    if (this.state.init) this.createChart();
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
        {creator && <button className='neutral-btn remove-option-btn' value={option.id} onClick={this.handleOptionDelete}>X</button>}
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
    this.setState({ newOption: e.target.value, invalidOption: false });
  }

  showIncorrectPoolWarning = () =>
    <p className='warning-msg'>'New option can't be an empty string and it can't match some of the existing options!'</p>

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
      this.setState({ invalidOption: true });
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

  createChart = () => {
    const optionVotes = [];
    const optionNames = [];
    const backgroundColor = [];

    for (let option in this.props.pool.options) {
      optionNames.push(this.props.pool.options[option].value);
      optionVotes.push(this.props.pool.options[option].votes);
      backgroundColor.push(general.getRandomColor());
    }

    let ctx = document.getElementById("myChart");
    const data = {
      datasets: [{
        data: [...optionVotes],
        backgroundColor
      }],
      labels: [...optionNames],
    }
    
    Chart.defaults.global.defaultFontSize = 20;
    let pieChart = new Chart(ctx, {
      type: 'pie',
      data,
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
    this.setState({ redirect: true, init: false });
  }

  tweet = () => {
    const poolUrl = `http://localhost:8080${this.props.history.location.pathname}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=Check out voting app\'s pool ${this.props.pool.name}&url=${poolUrl}`;
    window.open(twitterUrl);
  }

  render() {
    if (this.props.fetching) return <Loading />;  

    if (this.state.redirect) return <Redirect to='/' />;

    const isCreator = this.props.username === this.props.pool.creator;
    
    return (
      <main className='wrapper wrap-space-around'>
        {this.state.invalidOption && this.showIncorrectPoolWarning()}
        <section className='pool-section pool-shadow'>
          <h2>{this.props.pool.name}</h2>
          <address>created by {this.props.pool.creator || 'n/a'} <time>{this.state.dateCreated}</time></address>
          {this.props.pool.name && !this.state.voted && <ul className='options-list-no-box-shadow'>{this.getOptions(this.props.pool.options, this.props.pool.name, isCreator)}</ul>}
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
            <button className='twitter social-btn-sizes' onClick={this.tweet}><i className='fa fa-twitter' aria-hidden='true'></i> tweet </button>
          </div>}
        {isCreator && <button className='danger-btn-small social-btn-sizes' onClick={this.handlePoolDelete}>Delete Pool</button>}
        </div>
        <section className='pool-section'>
          <canvas id="myChart" width="240" height="240"></canvas>
          {this.props.pool.name && <ul className='options-list'>{this.showResults(this.props.pool.options)}</ul>}
        </section>
      </main>
    );
  }
}

export default Pool;

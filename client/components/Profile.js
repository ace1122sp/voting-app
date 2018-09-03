import React, { Component } from 'react';

import { general } from '../util/general';

import '../style/Profile.css';

import PoolCard from './PoolCard';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { poolsToShow: 'all' };
    this.tabs = document.getElementsByClassName('tab');
    if (this.props.poolToDelete) this.props.deletePool_f();
  }

  _resetToTabClass = () => {
    const count = this.tabs.length;
    for (let i = 0; i < count; i++) {
      this.tabs[i].className = 'tab';
    }
  }

  showAllPools = e => {
    this.setState({ poolsToShow: 'all' });
    this._resetToTabClass();
    e.target.className = 'tab tab-active';
  }

  showOwnPools = e => {
    this.setState({ poolsToShow: 'own' });
    this._resetToTabClass();
    e.target.className = 'tab tab-active';
  }

  showFollowedPools = e => {
    this.setState({ poolsToShow: 'followed' });
    this._resetToTabClass();
    e.target.className = 'tab tab-active';
  }

  render() {
    let poolsSelection;
    let allPools = general.getUniqueObjectsArray(this.props.user.createdPools, this.props.user.followingPools);
    this.state.poolsToShow == 'all' ? poolsSelection = allPools : this.state.poolsToShow == 'own' ? poolsSelection = this.props.user.createdPools : poolsSelection = this.props.user.followingPools;
    let pools = poolsSelection.map(pool => <li className='pool-card' key={pool._id}><PoolCard id={pool._id} name={pool.name} /></li>);
    
    return (
      <main className='wrapper wrap-flex-start'>
        <h2>{this.props.user.username}</h2>
        <p>
          <b>total pools: </b>
          <span>{this.props.user.createdPools.length}</span>
        </p>
        <section className='profile-content pool-section'>
          <nav className='nav-tabs'>
            <button className='tab tab-active' onClick={this.showAllPools}>All</button>
            <button className='tab' onClick={this.showOwnPools}>My Pools</button>
            <button className='tab' onClick={this.showFollowedPools}>Following</button>
          </nav>
          <ul>
            {pools}
          </ul>
        </section>
      </main>
    );
  }
}


export default Profile;

import React, { Component } from 'react';

import PoolCard from './PoolCard';

import { general } from '../util/general';

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
    let pools = poolsSelection.map(pool => <li key={pool._id}><PoolCard id={pool._id} name={pool.name} /></li>);
    
    return (
      <main>
        <aside>
          <div>
            <b>username</b>
            <br />
            <span>{this.props.user.username}</span>
          </div>
          <br />
          <div>
            <b>total pools</b>
            <br />
            <span>{this.props.user.createdPools.length}</span>
          </div>
          <br />
        </aside>
        <div>
          <nav>
            <button className='tab tab-active' onClick={this.showAllPools}>all</button>
            <button className='tab' onClick={this.showOwnPools}>my pools</button>
            <button className='tab' onClick={this.showFollowedPools}>following</button>
          </nav>
          <ul>
            {pools}
          </ul>
        </div>
      </main>
    );
  }
}


export default Profile;

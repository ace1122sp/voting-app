import React, { Component } from 'react';
import PoolCard from './PoolCard';
import { general } from '../util/general';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { poolsToShow: 'all' };

    if (this.props.poolToDelete) this.props.deletePool_f(this.props.poolToDelete);
  }

  showAllPools = () => {
    this.setState({ poolsToShow: 'all' });
  }

  showOwnPools = () => {
    this.setState({ poolsToShow: 'own' });
  }

  showFollowedPools = () => {
    this.setState({ poolsToShow: 'followed' });
  }

  render() {
    let poolsSelection;
    let allPools = general.getUniqueObjectsArray(this.props.poolsCreated, this.props.poolsFollowing);
    this.state.poolsToShow == 'all' ? poolsSelection = allPools : this.state.poolsToShow == 'own' ? poolsSelection = this.props.poolsCreated : poolsSelection = this.props.poolsFollowing;
    let pools = poolsSelection.map(pool => <PoolCard key={pool.id} id={pool.id} name={pool.name} />);

    return (
      <div>
        <aside>
          <div>
            <b>username</b><br />
            <span>{this.props.user.username}</span>
          </div><br />
          <div>
            <b>total pools</b><br />
            <span>{this.props.poolsCreated.length}</span>
          </div><br />
        </aside>
        <main>
          <nav>
            <button onClick={this.showAllPools}>all</button>
            <button onClick={this.showOwnPools}>my pools</button>
            <button onClick={this.showFollowedPools}>following</button>
          </nav>
          <ul>
            {pools}
          </ul>
        </main>
      </div>
    );
  }
}


export default Profile;

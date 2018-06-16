import React, { Component } from 'react';
import PoolCard from './PoolCard';

const combineArraysOfObjectsIntoArrOfUniqueObjects = (...args) => {
  const allObjects = {};
  const uniqueResults = [];
  args.forEach(arg => {
    arg.forEach(obj => {
      allObjects[obj.id] = { id: obj.id, name: obj.name }
    });
  });

  for (let obj in allObjects) {
    uniqueResults.push(allObjects[obj]);
  }

  return uniqueResults;
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { poolsToShow: 'all' };
    this.allPools = combineArraysOfObjectsIntoArrOfUniqueObjects(this.props.poolsCreated, this.props.poolsFollowing);

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
    this.state.poolsToShow == 'all' ? poolsSelection = this.allPools : this.state.poolsToShow == 'own' ? poolsSelection = this.props.poolsCreated : poolsSelection = this.props.poolsFollowing;
    const pools = poolsSelection.map(pool => <PoolCard key={pool.id} id={pool.id} name={pool.name} />);
    return (
      <div>
        <aside>
          <div>
            <b>username</b><br />
            <span>{this.props.user.username}</span>
          </div><br />
          <div>
            <b>total pools</b><br />
            <span>{this.props.user.createdPools.length}</span>
          </div><br />
          <a href='#'>settings</a>
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

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

// const Profile = props => {
//   const poolsArr = combineArraysOfObjectsIntoArrOfUniqueObjects(props.poolsCreated, props.poolsFollowing);
//   const pools = poolsArr.map(pool => <PoolCard key={pool.id} id={pool.id} name={pool.name} />);
//
//   // need to add Links to pools
//   return (
//     <div>
//       <aside>
//         <div>
//           <b>username</b><br />
//           <span>{props.user.username}</span>
//         </div><br />
//         <div>
//           <b>total pools</b><br />
//           <span>{props.user.createdPools.length}</span>
//         </div><br />
//         <a href='#'>settings</a>
//       </aside>
//       <main>
//         <nav>
//           <button>all</button>
//           <button>my pools</button>
//           <button>following</button>
//         </nav>
//         <ul>
//           {pools}
//         </ul>
//         <div>
//           <p>here come all poolls you are interested in...</p>
//         </div>
//       </main>
//     </div>
//   );
// }

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { poolsToShow: 'all' };
    this.allPools = combineArraysOfObjectsIntoArrOfUniqueObjects(this.props.poolsCreated, this.props.poolsFollowing);
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

  // need to add Links to pools
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
          <div>
            <p>here come all poolls you are interested in...</p>
          </div>
        </main>
      </div>
    );
  }
}


export default Profile;

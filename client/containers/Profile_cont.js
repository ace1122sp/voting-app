import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { deletePool } from '../actions/pools';
import { schedulePoolForDelete } from '../actions/scheduleForDelete';

const mapStateToProps = state => {
  const poolsFollowing = state.users[state.activeUser].followingPools.filter(pool => state.pools.hasOwnProperty(pool) ).map(pool => {
    return { id: pool, name: state.pools[pool].name };
  });
  const poolsCreated = state.users[state.activeUser].createdPools.filter(pool => state.pools.hasOwnProperty(pool)).map(pool => {
    return { id: pool, name: state.pools[pool].name };
  });

  return {
    user: state.users[state.activeUser],
    poolsFollowing,
    poolsCreated,
    poolToDelete: state.poolToDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    deletePool_f: poolId => {
      dispatch(deletePool(poolId));
      dispatch(schedulePoolForDelete(null));
    }
  }
}

const Profile_cont = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile_cont;

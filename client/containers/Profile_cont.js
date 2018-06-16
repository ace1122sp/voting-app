import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { deletePool } from '../actions/pools';
import { schedulePoolForDelete } from '../actions/scheduleForDelete';

const mapStateToProps = state => {
  let poolsFollowing = state.users[state.activeUser].followingPools.map(pool => {
    return { id: pool, name: state.pools[pool].name };
  });
  let poolsCreated = state.users[state.activeUser].createdPools.map(pool => {
    return { id: pool, name: state.pools[pool].name };
  });

  return {
    user: state.users[state.activeUser],
    poolsFollowing,
    poolsCreated,
    poolToDelete: state.poolToDelete
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

const Profile_cont = connect(mapStateToProps, null)(Profile);

export default Profile_cont;

import { connect } from 'react-redux';
import Profile from '../components/Profile';

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
    poolsCreated
  };
}

const mapDispatchToProps = dispatch => {
  return {}
}

const Profile_cont = connect(mapStateToProps, null)(Profile);

export default Profile_cont;

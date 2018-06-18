import { connect } from 'react-redux';
import Pool from '../components/Pool';
import { vote, addVotingOption, addFollower, removeFollower, deletePool } from '../actions/pools';
import { followPool, unfollowPool } from '../actions/user';
import { schedulePoolForDelete } from '../actions/scheduleForDelete';

const mapStateToProps = (state, ownProps) => {

  // based on :pool_id you need to provide pool's info
  // atm you don't need to send followers, just maybe its number,
  // just votes, but not info about voters

  const poolId = ownProps.match.params.pool_id;

  let totalVotes = 0
  const optionsKeys = Object.keys(state.pools[poolId].options);
  const options = [];

  optionsKeys.forEach(key => {
    totalVotes += state.pools[poolId].options[key].votes;
    options.push(state.pools[poolId].options[key]);
  });

  const isFollowedByActiveUser = state.pools[poolId].followers.some(follower => follower == state.activeUser) ? 'unfollow' : 'follow';

  return {
    name: state.pools[poolId].name,
    poolId: state.pools[poolId].id,
    options,
    isFollowedByActiveUser,
    dateCreated: state.pools[poolId].dateCreated,
    creator: state.pools[poolId].creator,
    totalVotes,
    username: state.activeUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    vote_f: (poolId, option) => dispatch(vote(poolId, option)),
    addVotingOption_f: (poolId, option) => dispatch(addVotingOption(poolId, option)),
    follow_f: (username, poolId) => {
      dispatch(followPool(username, poolId));
      dispatch(addFollower(poolId, username));
    },
    unfollow_f: (username, poolId) => {
      dispatch(unfollowPool(username, poolId));
      dispatch(removeFollower(poolId, username));
    },
    schedulePoolForDelete_f: poolId => dispatch(schedulePoolForDelete(poolId))
  }
}

const Pool_cont = connect(mapStateToProps, mapDispatchToProps)(Pool);

export default Pool_cont;

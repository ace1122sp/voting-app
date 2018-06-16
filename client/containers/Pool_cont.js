import { connect } from 'react-redux';
import Pool from '../components/Pool';
import { vote, addVotingOption, addFollower, removeFollower, deletePool } from '../actions/pools';
import { followPool, unfollowPool } from '../actions/user';

const mapStateToProps = (state, ownProps) => {

  // based on :pool_id you need to provide pool's info
  // atm you don't need to send followers, just maybe its number,
  // just votes, but not info about voters

  const poolId = ownProps.match.params.pool_id;
  const totalVotes = state.pools[poolId].options.reduce((total, curr) => {
    return curr.votes + total + 1;
  }, 0);
  const isFollowedByActiveUser = state.pools[poolId].followers.some(follower => follower == state.activeUser) ? 'unfollow' : 'follow';

  return {
    name: state.pools[poolId].name,
    poolId: state.pools[poolId].id,
    options: state.pools[poolId].options,
    isFollowedByActiveUser,
    dateCreated: state.pools[poolId].dateCreated,
    creator: state.pools[poolId].creator,
    totalVotes,
    username: state.activeUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    vote_f: (pool, option) => dispatch(vote(pool, option)),
    addVotingOption_f: (pool, optionName) => dispatch(addVotingOption(pool, optionName)),
    follow_f: (username, poolId) => {
      dispatch(followPool(username, poolId));
      dispatch(addFollower(poolId, username));
    },
    unfollow_f: (username, poolId) => {
      dispatch(unfollowPool(username, poolId));
      dispatch(removeFollower(poolId, username));
    },
    deletePool_f: poolId => dispatch(deletePool(poolId))
  }
}

const Pool_cont = connect(mapStateToProps, mapDispatchToProps)(Pool);

export default Pool_cont;

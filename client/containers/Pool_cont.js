import { connect } from 'react-redux';

import Pool from '../components/Pool';
import { general } from '../util/general';
import { fetchVote, fetchOptionAdd, fetchOptionRemove, fetchFollow, fetchUnfollow, fetchPool, fetchPoolDelete } from '../actions/thunks/pool';

const mapStateToProps = state => {
  const username = state.user ? state.user.username : null;
  const poolId = ownProps.match.params.pool_id;
  const totalVotes = general.getTotalVotes(state.pool.options);
  const isFollowedByActiveUser = !state.user ? null : state.user.followingPools.some(pool => pool._id == poolId) ? 'unfollow' : 'follow';
  
  return {
    poolId,
    pool: state.pool,
    isFollowedByActiveUser,
    totalVotes,
    username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPool_f: poolId => dispatch(fetchPool(poolId)),
    vote_f: (poolId, optionId) => dispatch(fetchVote(poolId, optionId)),
    addVotingOption_f: (poolId, option) => dispatch(fetchOptionAdd(poolId, option)),
    follow_f: (poolId, poolName, username) => {
      dispatch(fetchFollow(poolId, poolName, username));
    },
    unfollow_f: (username, poolId) => {
      dispatch(fetchUnfollow(poolId, username));
    },
    deletePool_f: poolId => dispatch(fetchPoolDelete(poolId)),
    removePoolOption_f: (poolId, optionId) => dispatch(fetchOptionRemove(poolId, optionId))
  }
}

const Pool_cont = connect(mapStateToProps, mapDispatchToProps)(Pool);

export default Pool_cont;

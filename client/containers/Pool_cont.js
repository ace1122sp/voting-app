import { connect } from 'react-redux';

import Pool from '../components/Pool';
import { general } from '../util/general';
import { fetchVote, fetchOptionAdd, fetchOptionRemove, fetchFollow, fetchUnfollow, fetchPool, fetchPoolDelete } from '../actions/thunks/pool';
import { startLoadingPool, endLoadingPool } from '../actions/pools';

const mapStateToProps = (state, ownProps) => {
  const username = state.user ? state.user.username : null;
  const poolId = ownProps.match.params.pool_id;
  const totalVotes = general.getTotalVotes(state.pool.options);
  const isFollowedByActiveUser = !state.user ? null : state.user.followingPools.some(pool => pool._id == poolId) ? 'unfollow' : 'follow';

  return {
    poolId,
    pool: state.pool,
    poolLoading: state.poolLoading,
    isFollowedByActiveUser,
    totalVotes,
    username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPool_f: poolId => {
      dispatch(startLoadingPool());
      return Promise.resolve(dispatch(fetchPool(poolId)));
    },
    vote_f: (poolId, optionId) => dispatch(fetchVote(poolId, optionId)),
    addVotingOption_f: (poolId, option) => dispatch(fetchOptionAdd(poolId, option)),
    follow_f: (poolId, poolName) => {
      dispatch(fetchFollow(poolId, poolName));
    },
    unfollow_f: poolId => {
      dispatch(fetchUnfollow(poolId));
    },
    deletePool_f: poolId => dispatch(fetchPoolDelete(poolId)),
    removePoolOption_f: (poolId, optionId) => dispatch(fetchOptionRemove(poolId, optionId)),
    startLoading_f: () => dispatch(startLoadingPool()),
    endLoading_f: () => dispatch(endLoadingPool())
  }
}

const Pool_cont = connect(mapStateToProps, mapDispatchToProps)(Pool);

export default Pool_cont;

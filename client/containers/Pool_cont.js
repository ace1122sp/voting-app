import { connect } from 'react-redux';

import Pool from '../components/Pool';
import { general } from '../util/general';
import { fetchVote, fetchOptionAdd, fetchOptionRemove, fetchFollow, fetchUnfollow } from '../actions/thunks/pool';
import { schedulePoolForDelete } from '../actions/scheduleForDelete';

const mapStateToProps = (state, ownProps) => {
  const username = state.user ? state.user.username : null;
  const poolId = ownProps.match.params.pool_id;
  const options = state.pool.options;
  const totalVotes = general.getTotalVotes(state.pool.options);
  const isFollowedByActiveUser = !state.user ? null : state.user.followingPools.some(pool => pool == poolId) ? 'unfollow' : 'follow';
  
  return {
    name: state.pool.name,
    creator: state.pool.creator,
    dateCreated: state.pool.dateCreated,
    poolId,
    options,
    isFollowedByActiveUser,
    totalVotes,
    username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    vote_f: (poolId, optionId) => dispatch(fetchVote(poolId, optionId)),
    addVotingOption_f: (poolId, option) => dispatch(fetchOptionAdd(poolId, option)),
    follow_f: (poolId, poolName, username) => {
      dispatch(fetchFollow(poolId, poolName, username));
    },
    unfollow_f: (username, poolId) => {
      dispatch(fetchUnfollow(poolId, username));
    },
    schedulePoolForDelete_f: () => dispatch(schedulePoolForDelete(true)),
    removePoolOption_f: (poolId, optionId) => dispatch(fetchOptionRemove(poolId, optionId))
  }
}

const Pool_cont = connect(mapStateToProps, mapDispatchToProps)(Pool);

export default Pool_cont;

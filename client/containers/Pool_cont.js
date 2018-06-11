import { connect } from 'react-redux';
import Pool from '../components/Pool';
import { vote, addVotingOption, followPool } from '../actions/pools';

const mapStateToProps = (state, ownProps) => {

  // according to :pool_id you need to provide pool's info
  // atm you don't need to send followers, just maybe its number,
  // just votes, but not info about voters

  // you need middlewares to be able to send the pool id to user who's created it
  const poolId = ownProps.match.params.pool_id;
  const totalVotes = state.pools[poolId].options.reduce((total, curr) => {
    return curr.votes + total + 1;
  }, 0);

  return {
    name: state.pools[poolId].name,
    poolId: state.pools[poolId].id,
    options: state.pools[poolId].options,
    totalVotes,
    followingPools: state.activeUser.followingPools,
    userId: state.activeUser.id
  }
}

const mapDispatchToProps = dispatch => {

  // need to provide follow()
  return {
    vote_f: (pool, option) => dispatch(vote(pool, option)),
    addVotingOption_f: (pool, optionName) => dispatch(addVotingOption(pool, optionName)),
    followPool_f: (id, followingPools) => dispatch(followPool(id, followingPools))
  }
}

const Pool_cont = connect(mapStateToProps, mapDispatchToProps)(Pool);

export default Pool_cont;

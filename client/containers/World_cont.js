import { connect } from 'react-redux';
import World from '../components/World';
import { deletePool } from '../actions/pools';
import { schedulePoolForDelete } from '../actions/scheduleForDelete';

const mapStateToProps = state => {

  console.log(state);
  return {
    pools: state.pools,
    poolToDelete: state.poolToDelete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePool_f: poolId => {
      dispatch(deletePool(poolId));
      dispatch(schedulePoolForDelete(null));
    }
  }
}

const World_cont = connect(mapStateToProps, mapDispatchToProps)(World);

export default World_cont;

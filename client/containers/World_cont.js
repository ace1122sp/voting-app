import { connect } from 'react-redux';
import World from '../components/World';
import { fetchPoolCards } from '../actions/thunks/pool';
import { unloadPool } from '../actions/pools';
import { schedulePoolForDelete } from '../actions/scheduleForDelete';

const mapStateToProps = state => {

  console.log(state);
  return {
    poolCards: state.poolCards,
    poolToDelete: state.poolToDelete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePool_f: () => {
      dispatch(unloadPool());
      dispatch(schedulePoolForDelete(false));
    },
    getPoolCards_f: offset => {
      dispatch(fetchPoolCards(offset));
    }
  }
}

const World_cont = connect(mapStateToProps, mapDispatchToProps)(World);

export default World_cont;

import { connect } from 'react-redux';
import World from '../components/World';
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
    }
  }
}

const World_cont = connect(mapStateToProps, mapDispatchToProps)(World);

export default World_cont;

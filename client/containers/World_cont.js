import { connect } from 'react-redux';
import World from '../components/World';
import { fetchPoolCards } from '../actions/thunks/pool';
import { unloadPool, loadInitPoolCards, loadAdditionalPoolCards } from '../actions/pools';
import { schedulePoolForDelete } from '../actions/scheduleForDelete';

const mapStateToProps = state => {
  console.log(state);
  return {
    poolCards: state.poolCards,
    poolToDelete: state.poolToDelete
  }
}

const mapDispatchToProps = dispatch => {
  
  // this is hacky solution, think about better approach
  dispatch(fetchPoolCards(0, loadInitPoolCards));
  return {
    deletePool_f: () => {
      dispatch(unloadPool());
      dispatch(schedulePoolForDelete(false));
    },
    getAdditionalPoolCards_f: offset => {
      dispatch(fetchPoolCards(offset, loadAdditionalPoolCards));
    }
  }
}

const World_cont = connect(mapStateToProps, mapDispatchToProps)(World);

export default World_cont;

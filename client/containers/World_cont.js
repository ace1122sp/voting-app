import { connect } from 'react-redux';
import World from '../components/World';
import { fetchPoolCards } from '../actions/thunks/pool';
import { unloadPool, loadInitPoolCards, loadAdditionalPoolCards } from '../actions/pools';
import { schedulePoolForDelete } from '../actions/scheduleForDelete';

const mapStateToProps = state => {
  console.log(state);
  return {
    poolCards: state.poolCards,
    poolToDelete: state.poolToDelete,
    fetching: state.fetchingRequest
  }
}

const mapDispatchToProps = dispatch => {
  
  // this is hacky solution, think about better approach
  dispatch(fetchPoolCards(loadInitPoolCards));
  return {
    deletePool_f: () => {
      dispatch(unloadPool());
      dispatch(schedulePoolForDelete(false));
    },
    getAdditionalPoolCards_f: offset => {
      dispatch(fetchPoolCards(loadAdditionalPoolCards, offset));
    }
  }
}

const World_cont = connect(mapStateToProps, mapDispatchToProps)(World);

export default World_cont;

import { connect } from 'react-redux';
import World from '../components/World';
import { fetchInitPoolCards, fetchAdditionalPoolCards } from '../actions/thunks/pool';
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
  
  // this is hacky solution, think about better approach
  dispatch(fetchInitPoolCards());
  return {
    deletePool_f: () => {
      dispatch(unloadPool());
      dispatch(schedulePoolForDelete(false));
    },
    getAdditionalPoolCards_f: offset => {
      dispatch(fetchAdditionalPoolCards(offset));
    }
  }
}

const World_cont = connect(mapStateToProps, mapDispatchToProps)(World);

export default World_cont;

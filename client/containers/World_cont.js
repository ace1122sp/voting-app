import { connect } from 'react-redux';
import World from '../components/World';

const mapStateToProps = state => {

  console.log(state);
  return {
    pools: {...state.pools}
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const World_cont = connect(mapStateToProps, null)(World);

export default World_cont;

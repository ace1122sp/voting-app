import { connect } from 'react-redux';
import World from '../components/World';

const mapStateToProps = state => {
  return {
    pools: {...state.pools}
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const World_cont = connect(mapStateToProps, mapDispatchToProps)(World);

export default World_cont;

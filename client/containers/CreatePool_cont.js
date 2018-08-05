import { connect } from 'react-redux';
import CreatePool from '../components/CreatePool';
import { fetchNewPool } from '../actions/thunks/pool';

const mapStateToProps = state => {
  return {
    username: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPool_f: pool => dispatch(fetchNewPool(pool)),
  }
}

const CreatePool_cont = connect(mapStateToProps, mapDispatchToProps)(CreatePool);

export default CreatePool_cont;

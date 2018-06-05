import { connect } from 'react-redux';
import CreatePool from '../components/CreatePool';
import { createPool } from '../actions/pools';

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    createPool_f: pool => dispatch(createPool(pool))
  }
}

const CreatePool_cont = connect(mapStateToProps, mapDispatchToProps)(CreatePool);

export default CreatePool_cont;

import { connect } from 'react-redux';
import CreatePool from '../components/CreatePool';

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = state => {

  // should provide createPool()
  return {}
}

const CreatePool_cont = connect(mapStateToProps, mapDispatchToProps)(CreatePool);

export default CreatePool_cont;

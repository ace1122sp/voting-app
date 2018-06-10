import { connect } from 'react-redux';
import CreatePool from '../components/CreatePool';
import { createPool } from '../actions/pools';

const mapStateToProps = state => {
  console.log(state.activeUser);
  return {
    creatorName: state.activeUser.username,
    creatorId: state.activeUser.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPool_f: pool => dispatch(createPool(pool))
  }
}

const CreatePool_cont = connect(mapStateToProps, mapDispatchToProps)(CreatePool);

export default CreatePool_cont;

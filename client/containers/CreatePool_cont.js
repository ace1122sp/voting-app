import { connect } from 'react-redux';
import CreatePool from '../components/CreatePool';
import { createPool } from '../actions/pools';
import { addOwnPoolToProfile } from '../actions/user';

const mapStateToProps = state => {
  return {
    username: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPool_f: pool => dispatch(createPool(pool)),
    addOwnPoolToProfile_f: (username, poolId) => dispatch(addOwnPoolToProfile(username, poolId))
  }
}

const CreatePool_cont = connect(mapStateToProps, mapDispatchToProps)(CreatePool);

export default CreatePool_cont;

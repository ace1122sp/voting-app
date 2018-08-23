import { connect } from 'react-redux';

import DeletedPool from '../components/DeletedPool';

import { endLoadingPool } from '../actions/pools';

const mapDispatchToProps = dispatch => {
  return {
    endLoadingPool_f: () => dispatch(endLoadingPool())
  }
}

const DeletedPool_cont = connect(null, mapDispatchToProps)(DeletedPool);

export default DeletedPool_cont;
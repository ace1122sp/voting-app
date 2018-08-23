import { connect } from 'react-redux';

import ServerError from '../components/ServerError';

import { endLoadingPool } from '../actions/pools';

const mapDispatchToProps = dispatch => {
  return {
    endLoadingPool_f: () => dispatch(endLoadingPool())
  }
}

const ServerError_cont = connect(null, mapDispatchToProps)(ServerError);

export default ServerError_cont;
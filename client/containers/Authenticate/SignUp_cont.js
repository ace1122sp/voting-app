import { connect } from 'react-redux';

import SignUp from '../../components/Authenticate/SignUp';

import { fetchRegister, fetchUser } from '../../actions/thunks/user';
import { updateRegisterStatus } from '../../actions/user';

const mapStateToProps = state => {
  return {
    registerStatus: state.registerStatus,
    fetchingRequest: state.fetchingRequest
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser_f: user => dispatch(fetchRegister(user)),
    getUser_f: () => dispatch(fetchUser()),
    resetRegisterStatus_f: () => dispatch(updateRegisterStatus(null))
  };
}

const SignUp_cont = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUp_cont;
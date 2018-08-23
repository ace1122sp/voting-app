import { connect } from 'react-redux';

import SignIn from '../../components/Authenticate/SignIn';

import { fetchLogin } from '../../actions/thunks/user';
import { updateBadLoginStatus } from '../../actions/user';

const mapStateToProps = state => {
  return {
    badLoginStatus: state.badLoginStatus,
    fetching: state.fetchingRequest
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn_f: credentials => dispatch(fetchLogin(credentials)),
    resetBadLoginStatus_f: () => dispatch(updateBadLoginStatus(null))
  }
}

const SignIn_cont = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignIn_cont;

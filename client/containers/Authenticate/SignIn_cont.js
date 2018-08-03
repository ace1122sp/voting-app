import { connect } from 'react-redux';
import SignIn from '../../components/Authenticate/SignIn';
import { fetchLogin } from '../../actions/thunks/user';

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn_f: credentials => dispatch(fetchLogin(credentials))
  }
}

const SignIn_cont = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignIn_cont;

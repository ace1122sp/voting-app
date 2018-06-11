import { connect } from 'react-redux';
import SignIn from '../../components/Authenticate/SignIn';
import { signIn } from '../../actions/user';

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn_f: username => dispatch(signIn(username))
  }
}

const SignIn_cont = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignIn_cont;

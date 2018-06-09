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
    signIn_f: user => dispatch(signIn(user))
  }
}

const SignIn_cont = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignIn_cont;

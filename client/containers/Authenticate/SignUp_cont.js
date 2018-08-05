import { connect } from 'react-redux';
import SignUp from '../../components/Authenticate/SignUp';
import { fetchRegister } from '../../actions/thunks/user';

const mapDispatchToProps = dispatch => {
  return {
    createUser_f: user => dispatch(fetchRegister(user))
  };
}

const SignUp_cont = connect(null, mapDispatchToProps)(SignUp);

export default SignUp_cont;

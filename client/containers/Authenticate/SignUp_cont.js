import { connect } from 'react-redux';
import SignUp from '../../components/Authenticate/SignUp';
import { fetchRegister } from '../../actions/thunks/user';
import { general } from '../../util/general';

const mapStateToProps = state => {
  return {
    users: general.getUsernamesInArray(state.users)
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createUser_f: user => dispatch(fetchRegister(user))
  };
}

const SignUp_cont = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUp_cont;

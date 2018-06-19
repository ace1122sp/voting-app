import { connect } from 'react-redux';
import SignUp from '../../components/Authenticate/SignUp';
import { createUser } from '../../actions/user';
import { general } from '../../util/general';

const mapStateToProps = state => {
  return {
    users: general.getUsernamesInArray(state.users)
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createUser_f: userObj => dispatch(createUser(userObj))
  };
}

const SignUp_cont = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUp_cont;

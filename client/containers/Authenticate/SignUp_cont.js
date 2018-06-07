import { connect } from 'react-redux';
import SignUp from '../../components/Authenticate/SignUp';
import { createUser } from '../../actions/user';

const mapStateToProps = state => {
  let users = [];
  for (let user in state.users) {
    let username = state.users[user].username;
    users.push(username);
  }

  return {
    users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser_f: (userObj) => dispatch(createUser(userObj))
  }
}

const SignUp_cont = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUp_cont;

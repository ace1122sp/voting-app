import { connect } from 'react-redux';
import Profile from '../components/Profile';

const mapStateToProps = state => {
  return {
    user: state.users[state.activeUser]
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const Profile_cont = connect(mapStateToProps, null)(Profile);

export default Profile_cont;

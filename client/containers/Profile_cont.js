import { connect } from 'react-redux';
import Profile from '../components/Profile';

const mapStateToProps = state => {
  return {
    user: state.activeUser
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const Profile_cont = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile_cont;

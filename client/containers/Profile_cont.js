import { connect } from 'react-redux';
import Profile from '../components/Profile';

const mapStateToProps = state => {

  // It needs user's username, lists of user created pools,
  // list of pools which user follows
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

const Profile_cont = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile_cont;

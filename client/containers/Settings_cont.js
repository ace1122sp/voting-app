import { connect } from 'react-redux';
import Settings from '../components/Settings';
import { fetchUserUpdate, fetchUserDelete } from '../actions/thunks/user';

const mapStateToProps = state => {
  return {
    username: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePassword: newPassword => dispatch(fetchUserUpdate(newPassword)),
    deleteProfile: () => dispatch(fetchUserDelete)
  }
}

const Settings_cont = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default Settings_cont;

import { connect } from 'react-redux';
import ChangePassword from '../../components/settings/ChangePassword';
import { fetchUserUpdate } from '../../actions/thunks/user';

const mapStateToProps = state => {
  return {
    updateStatus: state.userUpdateStatus,
    fetching: state.fetchingRequest
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePassword_f: (currentPassword, newPassword) => {
      dispatch(fetchUserUpdate(currentPassword, newPassword));
    }
  }
}

const ChangePassword_cont = connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

export default ChangePassword_cont;
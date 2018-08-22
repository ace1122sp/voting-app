import { connect } from 'react-redux';
import DeleteProfile from '../../components/settings/DeleteProfile';
import { fetchUserDelete } from '../../actions/thunks/user';
import { unloadUser, updateUser } from '../../actions/user';

const mapStateToProps = state => {
  return {
    updateStatus: state.userUpdateStatus,
    fetching: state.fetchingRequest
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProfile_f: () => {
      dispatch(fetchUserDelete());
    },
    renderRedirect_f: () => {
      dispatch(unloadUser());
      dispatch(updateUser(null));
    }
  }
}

const DeleteProfile_cont = connect(mapStateToProps, mapDispatchToProps)(DeleteProfile);

export default DeleteProfile_cont;
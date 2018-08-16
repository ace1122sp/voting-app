import { connect } from 'react-redux';
import DeleteProfile from '../../components/settings/DeleteProfile';
import { fetchUserDelete } from '../../actions/thunks/user';

const mapStateToProps = state => {
  return {
    updateStatus: state.userUpdateStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProfile_f: () => {
      dispatch(fetchUserDelete());
    }
  }
}

const DeleteProfile_cont = connect(mapStateToProps, mapDispatchToProps)(DeleteProfile);

export default DeleteProfile_cont;
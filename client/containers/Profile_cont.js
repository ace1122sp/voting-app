import { connect } from 'react-redux';
import Profile from '../components/Profile';

import { schedulePoolForDelete } from '../actions/scheduleForDelete';
import { unloadPool } from '../actions/pools';

const mapStateToProps = state => {
  return {
    user: state.user,
    poolToDelete: state.poolToDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    deletePool_f: () => { // not used atm
      dispatch(unloadPool());
      dispatch(schedulePoolForDelete(false));
    }
  }
}

const Profile_cont = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile_cont;

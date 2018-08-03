import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { deletePool } from '../actions/pools';
import { schedulePoolForDelete } from '../actions/scheduleForDelete';

const mapStateToProps = state => {
  return {
    user: state.user,
    poolToDelete: state.poolToDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    deletePool_f: poolId => {
      dispatch(deletePool(poolId));
      dispatch(schedulePoolForDelete(null));
    }
  }
}

const Profile_cont = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile_cont;

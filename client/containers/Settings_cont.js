import { connect } from 'react-redux';

import Settings from '../components/Settings';

import { updateUser } from '../actions/user';

const mapStateToProps = state => {
  return {
    username: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetUserStatus_f: () => {
      dispatch(updateUser(null));
    }
  }
}

const Settings_cont = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default Settings_cont;

import { connect } from 'react-redux';

import Settings from '../components/Settings';

import { updateUser } from '../actions/user';

const mapDispatchToProps = dispatch => {
  return {
    resetUserStatus_f: () => {
      dispatch(updateUser(null));
    }
  }
}

const Settings_cont = connect(null, mapDispatchToProps)(Settings);

export default Settings_cont;

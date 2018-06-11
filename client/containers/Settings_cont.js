import { connect } from 'react-redux';
import Settings from '../components/Settings';

const mapStateToProps = state => {
  return {
    username: state.activeUser
  }
}

const mapDispatchToProps = dispatch => {

  // deleteProfile()
  return {}
}

const Settings_cont = connect(mapStateToProps, null)(Settings);

export default Settings_cont;

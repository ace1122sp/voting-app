import { connect } from 'react-redux';
import Settings from '../components/Settings';

const mapStateToProps = state => {

  // needs user's email & username
  // think through password changing
  return {}
}

const mapDispatchToProps = dispatch => {

  // needs saveProfileSettings(), deleteProfile()
  // think through changing password
  return {}
}

const Settings_cont = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default Settings_cont;

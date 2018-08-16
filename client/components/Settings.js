import React from 'react';
import Portal from './Portal';
import ChangePassword_cont from '../containers/settings/ChangePassword_cont';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { portal: false };
  }

  openPortal = () => {
    this.setState({ portal: true });
  }

  closePortal = () => {
    this.props.resetUserStatus_f();
    this.setState({ portal: false });
  }

  portalImplementation = () => <Portal>
    <ChangePassword_cont />
    <button onClick={this.closePortal}>Close</button>
  </Portal>
  // props --> changePassword() deleteProfile() username
  render () {
    return (
      <div>
        {this.state.portal && 
        this.portalImplementation()
          }
        <h1>Settings</h1>
        <h2>{this.props.username}</h2>
        <form>
          <input type='button' value='change password' onClick={this.openPortal} /><br />
          <br /><br />
          <input type='button' value='Delete Profile' /><br />
          <br />
        </form><br />
      </div>
    );
  }
}

export default Settings;
import React from 'react';
import Portal from './Portal';
import ChangePassword_cont from '../containers/settings/ChangePassword_cont';
import DeleteProfile_cont from '../containers/settings/DeleteProfile_cont';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      updatePasswordPortal: false,
      deleteProfilePortal: false
    };
  }

  openUpdatePasswordPortal = () => {
    this.setState({ updatePasswordPortal: true });
  }

  closeUpdatePasswordPortal = () => {
    this.props.resetUserStatus_f();
    this.setState({ updatePasswordPortal: false });
  }

  updatePasswordPortalImplementation = () => 
    <Portal>
      <ChangePassword_cont />
      <button onClick={this.closeUpdatePasswordPortal}>Close</button>
    </Portal>

  openDeleteProfilePortal = () => {
    this.setState({ deleteProfilePortal: true });
  }

  closeDeleteProfilePortal = () => {
    this.props.resetUserStatus_f();
    this.setState({ deleteProfilePortal: false });
  }

  deleteProfilePortalImplementation = () => 
    <Portal>
      <DeleteProfile_cont />
      <button onClick={this.closeDeleteProfilePortal}>Close</button>
    </Portal>

  render () {
    return (
      <div>
        {this.state.updatePasswordPortal && 
        this.updatePasswordPortalImplementation()
          }
        {this.state.deleteProfilePortal &&
          this.deleteProfilePortalImplementation()
        }
        <h1>Settings</h1>
        <h2>{this.props.username}</h2>
        <form>
          <input type='button' value='Change Password' onClick={this.openUpdatePasswordPortal} /><br />
          <br /><br />
          <input type='button' value='Delete Profile' onClick={this.openDeleteProfilePortal} /><br />
          <br />
        </form><br />
      </div>
    );
  }
}

export default Settings;
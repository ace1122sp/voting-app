import React from 'react';

import ChangePassword_cont from '../containers/settings/ChangePassword_cont';
import DeleteProfile_cont from '../containers/settings/DeleteProfile_cont';

import Portal from './Portal';

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
      <button className='neutral-btn' onClick={this.closeUpdatePasswordPortal}>Close</button>
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
      <button className='neutral-btn' onClick={this.closeDeleteProfilePortal}>Cancel</button>
    </Portal>

  render () {
    return (
      <main>
        {this.state.updatePasswordPortal && 
        this.updatePasswordPortalImplementation()
          }
        {this.state.deleteProfilePortal &&
          this.deleteProfilePortalImplementation()
        }
        <h2>Settings</h2>
        <h3>{this.props.username}</h3>
        <button className='neutral-btn' onClick={this.openUpdatePasswordPortal}>Change Password</button>
        <br /><br />
        <button className='neutral-btn' onClick={this.openDeleteProfilePortal}>Delete Profile</button>
        <br /><br />
      </main>
    );
  }
}

export default Settings;
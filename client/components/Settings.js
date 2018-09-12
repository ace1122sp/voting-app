import React from 'react';

import '../style/Settings.css';
import '../style/Portal.css';

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
      <div className='portal-inner-wrap pool-shadow'>
        <ChangePassword_cont />
        <button className='button-base neutral-btn' onClick={this.closeUpdatePasswordPortal}>Close</button>
      </div>
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
      <div className='portal-inner-wrap pool-shadow'>
        <DeleteProfile_cont />
        <button id='delete-cancel-btn' className='button-base neutral-btn' onClick={this.closeDeleteProfilePortal}>Cancel</button>
      </div>
    </Portal>

  render () {
    return (
      <main className='wrapper'>
        {this.state.updatePasswordPortal && 
        this.updatePasswordPortalImplementation()
          }
        {this.state.deleteProfilePortal &&
          this.deleteProfilePortalImplementation()
        }
        <h2>Settings</h2>
        <div>
          <div className='form-base settings-wrapper'>
            <button className='button-base neutral-btn' onClick={this.openUpdatePasswordPortal}>Change Password</button>
            <button className='button-base neutral-btn' onClick={this.openDeleteProfilePortal}>Delete Profile</button>
          </div>
        </div>
      </main>
    );
  }
}

export default Settings;
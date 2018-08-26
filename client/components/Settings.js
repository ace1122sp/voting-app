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
      <button onClick={this.closeDeleteProfilePortal}>Cancel</button>
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
        <form>
          <input className='neutral-btn' type='button' value='Change Password' onClick={this.openUpdatePasswordPortal} />
          <br /><br />
          <input className='neutral-btn' type='button' value='Delete Profile' onClick={this.openDeleteProfilePortal} />
          <br /><br />
        </form>
      </main>
    );
  }
}

export default Settings;
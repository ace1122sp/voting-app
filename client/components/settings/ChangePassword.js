import React from 'react';

import { URL_PROFILE } from '../../resources/urls';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentPassword: '',
      newPassword: '',
      reNewPassword: '',
      warning: null
    };
  }

  checkMatching = (str1, str2) => str1 === str2

  handleOldPasswordTyping = e => {
    this.setState({ currentPassword: e.target.value });
  }
  
  handleNewPasswordTyping = e => {
    this.setState({ newPassword: e.target.value, warning: null });
  }

  handleNewPasswordRetyping = e => {
    this.setState({ reNewPassword: e.target.value, warning: null });
  }

  handleRequest = e => {
    e.preventDefault();
    if (this.state.newPassword.length < 5) {
      this.setState({ warning: 'Your new password must be at least 5 characters long!' });
      return;
    }

    if (this.state.newPassword === this.state.reNewPassword) {
      this.props.updatePassword_f(this.state.currentPassword, this.state.newPassword);
    } else {
      this.setState({ warning: 'passwords do not match' });
    }
  }

  showForm = () => 
    <form action={URL_PROFILE} method="PUT" onSubmit={this.handleRequest}>
      <label htmlFor="currentPassword">current password</label>
      <input type="password" name="currentPassword" id="currentPassword" onChange={this.handleOldPasswordTyping} value={this.state.currentPassword} /><br />
      <label htmlFor="newPassword">new password</label>
      <input type="password" name="newPassword" id="newPassword" onChange={this.handleNewPasswordTyping} value={this.state.newPassword} /><br />
      <label htmlFor="reNewPassword">retype new password</label>
      <input type="password" name="reNewPassword" id="reNewPassword" onChange={this.handleNewPasswordRetyping} value={this.state.reNewPassword} /><br />
      <button className='aggressive-btn'>Confirm</button>
    </form>

  showMessage = () => 
      <p>
        {this.props.updateStatus}
      </p>
  
  render () {
    if (this.props.fetching) return <em>Loading...</em>
    return (
      <div>
        <p>{ this.state.warning }</p>
        { !this.props.updateStatus && this.showForm() || this.showMessage() }
      </div>
    );
  }
}

export default ChangePassword;
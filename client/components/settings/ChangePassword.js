import React from 'react';
import { URL_PROFILE } from '../../resources/urls';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentPassword: '',
      newPassword: '',
      reNewPassword: ''
    };
  }

  checkMatching = (str1, str2) => str1 === str2

  handleOldPasswordTyping = e => {
    this.setState({ currentPassword: e.target.value });
  }
  
  handleNewPasswordTyping = e => {
    this.setState({ newPassword: e.target.value });
  }

  handleNewPasswordRetyping = e => {
    this.setState({ reNewPassword: e.target.value });
  }

  handleRequest = e => {
    e.preventDefault();
    if (this.state.newPassword === this.state.reNewPassword) {
      this.props.updatePassword_f(this.state.currentPassword, this.state.newPassword);
    } else {
      console.log('passwords do not match');
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
      <input type="submit" value="Confirm" />
    </form>

  showMessage = () => 
    <div>
      {this.props.updateStatus}
    </div>
  
  render () {
    return (
      <div>
        { !this.props.updateStatus && this.showForm() || this.showMessage() }
      </div>
    );
  }
}

export default ChangePassword;
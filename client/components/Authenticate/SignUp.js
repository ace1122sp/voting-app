import React, { Component } from 'react';

import { validator } from '../../util/validator';

import '../../style/Portal.css';

import InlineLoading from '../InlineLoading';
import Portal from '../Portal';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordAgain: '',
      shortPassword: false,
      shortUsername: false
    };
  }

  loadUser = () => {
    this.props.resetRegisterStatus_f();
    this.props.getUser_f();
  }

  renderPortal = () => 
    <Portal>
      <div className='portal-inner-wrap pool-shadow'>
        <h2>Registration successful!</h2>
        {!this.props.fetchingRequest && <button className='aggressive-btn' onClick={this.loadUser}>ok</button>}
      </div>
    </Portal>

  handleChangeEmail = e => {
    this.setState({ email: validator.removeSpaces(e.target.value) });
  }

  handleChangeUsername = e => {
    this.setState({ username: validator.removeSpaces(e.target.value), shortUsername: false });
    this.props.resetRegisterStatus_f();
  }

  handleChangePassword = e => {
    this.setState({ password: e.target.value, shortPassword: false })
  }

  handleChangePasswordAgain = e => {
    this.setState({ passwordAgain: e.target.value });
  }

  isError = () => this.props.registerStatus !== null && this.props.registerStatus !== 'ok'
  
  showIncorrectPasswordWarning = () => 
    <p className='warning-msg'>Passwords must match and password must be at least 5 characters long!</p>
  
  showShortUsernameWarning = () => 
    <p className='warning-msg'>Username must be at least 4 characters long.</p>

  showErrorMessage = () => 
    <p className='warning-msg'>error: {this.props.registerStatus}</p>

  handleSubmit = e => {
    e.preventDefault();
    // Password validation
    if (this.state.password === this.state.passwordAgain && this.state.password.length > 4) {

      // Init validators
      const usernameLongEnough = this.state.username.length > 3;
      const emailValid = this.state.email.length > 9;

      // Username & email validation
      if (usernameLongEnough && emailValid) {
        this.props.createUser_f({ username: this.state.username, email: this.state.email, password: this.state.password });
      } else {
        this.setState({ shortUsername: true });
      }

    } else {
      this.setState({
        password: '',
        passwordAgain: '',
        shortPassword: true
      });
    }
  }

  render() {
    return (
      <main className='wrapper'>
        {this.props.registerStatus === 'ok' && this.renderPortal()}
        {this.state.shortPassword && this.showIncorrectPasswordWarning()}
        {this.state.shortUsername && this.showShortUsernameWarning()}
        {this.isError() && this.showErrorMessage()}      
        <h2>Create Your Account</h2>
        <div className='wrapper wrap-space-around'>
          <form className='form-base' onSubmit={this.handleSubmit}>
            <label>email</label>
            <br />
            <input type='email' value={this.state.email} onChange={this.handleChangeEmail} />
            <br /><br />
            <label>username</label>
            <br />
            <input type='text' value={this.state.username} onChange={this.handleChangeUsername} />
            <br /><br />
            <label>password</label>
            <br />
            <input type='password' value={this.state.password} onChange={this.handleChangePassword} />
            <br /><br />
            <label>confirm password</label>
            <br />
            <input type='password' value={this.state.passwordAgain} onChange={this.handleChangePasswordAgain} />
            <br />
            <br />
            {!this.props.fetchingRequest && <button type='submit' className='aggressive-btn'>Create Account</button>}
            {this.props.fetchingRequest && <InlineLoading />}
          </form>
        </div>
        <br />
      </main>
    );
  }
}

export default SignUp;

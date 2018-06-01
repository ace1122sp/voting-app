import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordAgain: ''
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordAgain = this.handleChangePasswordAgain.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value })
  }

  handleChangePasswordAgain(e) {
    this.setState({ passwordAgain: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordAgain) {
      alert('Fake SignUp done');
      this.setState({
        email: '',
        username: '',
        password: '',
        passwordAgain: ''
      });
    } else {
      alert('passwords are not identical');
      this.setState({
        password: '',
        passwordAgain: ''
      });
    }
  }

  render() {
    return (
      <div>
        <h3>Create Your Account</h3>
        <form onSubmit={this.handleSubmit}>
          <label>email</label><br />
          <input type='email' value={this.state.email} onChange={this.handleChangeEmail} /><br />
          <br />
          <label>username</label><br />
          <input type='text' value={this.state.username} onChange={this.handleChangeUsername} /><br />
          <br />
          <label>password</label><br />
          <input type='password' value={this.state.password} onChange={this.handleChangePassword} /><br />
          <label>confirm password</label><br />
          <input type='password' value={this.state.passwordAgain} onChange={this.handleChangePasswordAgain} /><br />
          <br /><br />
          <input type='submit' value='Create Account' /><br />
        </form><br />
      </div>
    );
  }
}

export default SignUp;

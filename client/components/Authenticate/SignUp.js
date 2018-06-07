import React, { Component } from 'react';
import { validator } from '../../util/validator';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordAgain: ''
    };
  }

  handleChangeEmail = (e) => {

    let cleanedEmail = validator.removeSpaces(e.target.value);
    this.setState({ email: cleanedEmail });
  }

  handleChangeUsername = (e) => {
    let cleanedUsername = validator.removeSpaces(e.target.value);
    this.setState({ username: cleanedUsername });
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  handleChangePasswordAgain = (e) => {
    this.setState({ passwordAgain: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    if (this.state.password === this.state.passwordAgain && this.state.password.length > 3) {

      // Init validators
      let usernameUnique = validator.isUnique(this.state.username, this.props.users);
      let usernameLongEnough;
      let emailValid;

      this.state.username.length > 3 ? usernameLongEnough = true : usernameLongEnough = false;
      this.state.email.length > 9 ? emailValid = true : emailValid = false;

      // Username & email validation
      if (usernameUnique && usernameLongEnough && emailValid) {
        alert('Successfuly signed up!');
        this.props.createUser_f({ username: this.state.username, email: this.state.email, password: this.state.password });
        this.setState({
          email: '',
          username: '',
          password: '',
          passwordAgain: ''
        });
      } else {
        alert('Oops, somebody has taken that username. And also be sure that your username is longer than 3 characters and your email is longer than 9 characters.');
      }
    } else {
      alert('Your password must be longer than 3 characters and passwords must match.');
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

import React, { Component } from 'react';
import { validator } from '../../util/validator';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordAgain: '',
      redirect: false
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) return <Redirect to='/' />
  }

  handleChangeEmail = e => {
    this.setState({ email: validator.removeSpaces(e.target.value) });
  }

  handleChangeUsername = e => {
    this.setState({ username: validator.removeSpaces(e.target.value) });
  }

  handleChangePassword = e => {
    this.setState({ password: e.target.value })
  }

  handleChangePasswordAgain = e => {
    this.setState({ passwordAgain: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    // Password validation
    if (this.state.password === this.state.passwordAgain && this.state.password.length > 3) {

      // Init validators
      const usernameUnique = validator.isUnique(this.state.username, this.props.users);
      const usernameLongEnough = this.state.username.length > 3;
      const emailValid = this.state.email.length > 9;

      // Username & email validation
      if (usernameUnique && usernameLongEnough && emailValid) {
        alert('Successfuly signed up!');
        this.props.createUser_f({ username: this.state.username, email: this.state.email, password: this.state.password });
        this.setState({
          email: '',
          username: '',
          password: '',
          passwordAgain: '',
          redirect: true
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
        {this.renderRedirect()}
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

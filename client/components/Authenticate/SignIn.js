import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChangeUsername = e => {
    this.setState({ username: e.target.value });
    this.props.resetBadLoginStatus_f();
  }

  handleChangePassword = e => {
    this.setState({ password: e.target.value });
    this.props.resetBadLoginStatus_f();
  }

  handleSubmit = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    // validate input if necessary 
    this.props.signIn_f({ username, password });

    // handle bad login
  }

  showBadLoginWarning = () => 
    <p>Username or password incorrect!</p>

  render() {
    return (
      <div>
        <h3>Sign in</h3>
        {this.props.badLoginStatus && this.showBadLoginWarning()}
        <form onSubmit={this.handleSubmit}>
          <label>username</label><br />
          <input type='username' value={this.state.username} onChange={this.handleChangeUsername} /><br />
          <br />
          <label>password</label><br />
          <input type='password' value={this.state.password} onChange={this.handleChangePassword} /><br />
          <br /><br />
          <input type='submit' value='Confirm' /><br />
        </form><br />
      </div>
    );
  }
}

export default SignIn;

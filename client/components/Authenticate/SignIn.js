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

  handleChangeEmail = (e) => {
    this.setState({ username: e.target.value });
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    // Very insecure auth proccess
    if (this.props.users.hasOwnProperty(username)) {
      if (this.props.users[username].password == password) {
        alert(`${username}, you have successfuly signed in!`);
        this.props.signIn_f(username);
        this.setState({
          username: '',
          password: ''
        });
      } else {
        alert('Username or password are incorrect!');
      }
    } else {
      alert('Username or password are incorrect!');
      // this.props.users.hasOwnProperty(username); ??????????
    }

  }

  render() {
    return (
      <div>
        <h3>Sign in</h3>
        <form onSubmit={this.handleSubmit}>
          <label>username</label><br />
          <input type='username' value={this.state.username} onChange={this.handleChangeEmail} /><br />
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

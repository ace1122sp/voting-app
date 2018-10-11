import React, { Component } from 'react';

import { general } from '../../util/general';

import Loading from '../Loading';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidUpdate() {
    general.setMainMarginTop();
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
    
    this.props.signIn_f({ username, password });
  }

  showBadLoginWarning = () => 
    <p className='warning-msg'>Username or password incorrect!</p>

  render() {
    if (this.props.fetching) return <Loading />;

    return (
      <main className='wrapper'>
        <h2>Sign in</h2>
        {this.props.badLoginStatus && this.showBadLoginWarning()}
        <div className='wrapper wrap-space-around'>
          <form className='form-base' onSubmit={this.handleSubmit}>
            <label>username</label>
            <br />
            <input type='text' value={this.state.username} onChange={this.handleChangeUsername} />
            <br /><br />
            <label>password</label>
            <br />
            <input type='password' value={this.state.password} onChange={this.handleChangePassword} />
            <br /><br />
            <br />
            <button className='aggressive-btn'>Confirm</button>
            <br />
          </form>
        </div>
        <br />
      </main>
    );
  }
}

export default SignIn;

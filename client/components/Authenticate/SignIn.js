import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>Sign in</h3>
        <form>
          <label>email</label><br />
          <input type='email' value='' /><br />
          <br />
          <label>password</label><br />
          <input type='password' value='' /><br />
          <br /><br />
          <input type='submit' value='Confirm' /><br />
        </form><br />
      </div>
    );
  }
}

export default SignIn;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

const SignIn = props => {
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

const SignUp = props => {
  return (
    <div>
      <h3>Create Your Account</h3>
      <form>
        <label>email</label><br />
        <input type='email' value='' /><br />
        <br />
        <label>username</label><br />
        <input type='text' value='' /><br />
        <br />
        <label>password</label><br />
        <input type='password' value='' /><br />
        <label>confirm password</label><br />
        <input type='password' value='' /><br />
        <br /><br />
        <input type='submit' value='Create' /><br />
      </form><br />
    </div>
  );
}

const Authenticate = props =>
  <div>
    <Switch>
      <Route path='/auth/sign_in' component={SignIn} />
      <Route path='/auth/sign_up' component={SignUp} />
      <Route path='/auth' render={() => <h1>404! These aren't the droids you're looking for...</h1>} />
    </Switch>
  </div>

module.exports = Authenticate;

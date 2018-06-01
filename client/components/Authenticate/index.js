import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Authenticate = props =>
  <div>
    <Switch>
      <Route path='/auth/sign_in' component={SignIn} />
      <Route path='/auth/sign_up' component={SignUp} />
      <Route path='/auth' render={() => <h1>404! These aren't the droids you're looking for...</h1>} />
    </Switch>
  </div>

export default Authenticate;

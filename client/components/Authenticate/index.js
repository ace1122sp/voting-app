import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignUp_cont from '../../containers/Authenticate/SignUp_cont';
import SignIn_cont from '../../containers/Authenticate/SignIn_cont';

const Authenticate = props =>
  <Switch>
    <Route path='/auth/sign_in' component={SignIn_cont} />
    <Route path='/auth/sign_up' component={SignUp_cont} />
    <Route path='/auth' render={() => <h1>404! These aren't the droids you're looking for...</h1>} />
  </Switch>
  

export default Authenticate;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import World from './World';
import CreatePool from './CreatePool';
import Profile from './Profile';
import Settings from './Settings';

const Main = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={World} />
        <Route path='/new-pool' component={CreatePool} />
        <Route path='/profile' component={Profile} />
        <Route path='/settings' component={Settings} />
        <Route render={() => <h1>404 oooops page not found</h1>} />
      </Switch>
    </div>
  );
}

module.exports = Main;

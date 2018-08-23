import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { commonRoutes, authenticatedRoutes, guestRoutes } from '../routes';

const Main = props => {
  let routes = [...commonRoutes];
  props.user ? routes = [...routes, ...authenticatedRoutes] : routes = [...routes, ...guestRoutes];
  return (
    <div>
      <Switch>
        {routes.map(({ path, exact, component: Comp, ...rest }) => (
          <Route key={path} path={path} exact={exact} render={props => <Comp {...props} {...rest} />} />
        ))}
        <Route render={() => <Redirect to='/' />} />
      </Switch>
    </div>
  );
}

export default Main;

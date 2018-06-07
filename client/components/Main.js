import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../routes';

// FIXME: figure out how to check if provided poolId for route is valid, and if it isn't then navigate to 404 page 

const Main = () => {
  return (
    <div>
      <Switch>
        {routes.map(({ path, exact, component: Comp, ...rest }) => (
          <Route key={path} path={path} exact={exact} render={props => <Comp {...props} {...rest} />} />
        ))}
        <Route render={() => <h1>404 ooooops page not found</h1>} />
      </Switch>
    </div>
  );
}

export default Main;

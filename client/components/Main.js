import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../routes';
import Pool_cont from '../containers/Pool_cont';

const Main = () => {
  return (
    <div>
      <Switch>
        {routes.map(({ path, exact, component: Comp, ...rest }) => (
          <Route key={path} path={path} exact={exact} render={props => <Comp {...props} {...rest} />} />
        ))}
        <Route path='/pools/:pool_id' component={Pool_cont} />
        <Route render={() => <h1>404 ooooops page not found</h1>} />
      </Switch>
    </div>
  );
}

export default Main;

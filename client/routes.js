import World_cont from './containers/World_cont'
import Authenticate from './components/Authenticate/';
import CreatePool_cont from './containers/CreatePool_cont';
import Profile_cont from './containers/Profile_cont';
import Settings_cont from './containers/Settings_cont';
import Pool_cont from './containers/Pool_cont';

const routes = [
  {
    path: '/',
    exact: true,
    component: World_cont
  },
  {
    path: '/auth/:sign_option',
    component: Authenticate
  },
  {
    path: '/new-pool',
    component: CreatePool_cont
  },
  {
    path: '/profile',
    component: Profile_cont
  },
  {
    path: '/settings',
    component: Settings_cont
  },
  {
    path: '/pools/:pool_id',
    component: Pool_cont
  }
];

export default routes;

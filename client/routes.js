import World from './components/World';
import Authenticate from './components/Authenticate/';
import CreatePool from './components/CreatePool';
import Profile from './components/Profile';
import Settings from './components/Settings';

const routes = [
  {
    path: '/',
    exact: true,
    component: World
  },
  {
    path: '/auth/:sign_option',
    component: Authenticate
  },
  {
    path: '/new-pool',
    component: CreatePool
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/settings',
    component: Settings
  },
];

export default routes;

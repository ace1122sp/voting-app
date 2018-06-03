import World_cont from './containers/World_cont'
import Authenticate from './components/Authenticate/';
import CreatePool from './components/CreatePool';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Pool from './components/Pool';

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
  {
    path: '/pools/:pool_id',
    component: Pool,
    name: 'Ace vs Coa',
    options: [{ id: 'ace', name: 'ace' }, {id: 'coa', name: 'coa'}],
  }
];

export default routes;

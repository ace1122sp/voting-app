import World_cont from './containers/World_cont'
import Pool_cont from './containers/Pool_cont';
import CreatePool_cont from './containers/CreatePool_cont';
import DeletedPool_cont from './containers/DeletedPool_cont';
import Profile_cont from './containers/Profile_cont';
import Settings_cont from './containers/Settings_cont';
import ServerError_cont from './containers/ServerError_cont';
import Authenticate from './components/Authenticate/';

export const commonRoutes = [
  {
    path: '/',
    exact: true,
    component: World_cont
  },
  {
    path: '/no-pool/',
    exact: true,
    component: DeletedPool_cont
  },
  {
    path: '/pools/:pool_id',
    component: Pool_cont
  },
  {
    path: '/server-error',
    component: ServerError_cont
  }
]

export const authenticatedRoutes = [
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
  }
];

export const guestRoutes = [
  {
    path: '/auth/:sign_option',
    component: Authenticate
  }
]

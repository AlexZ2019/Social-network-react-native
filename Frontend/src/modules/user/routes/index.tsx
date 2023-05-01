import { RouteType } from '../../common/interfaces/moduleInterfaces';
import constants from '../constants';
import Profile from '../pages/Profile';
import Users from '../pages/Users';

export const routes = [
  {
    path: constants.profile,
    page: <Profile/>,
    type: RouteType.Auth,
  },
  {
    path: constants.users,
    page: <Users/>,
    type: RouteType.Auth,
  },

];

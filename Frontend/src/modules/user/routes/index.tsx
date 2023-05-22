import { RouteType } from '../../common/interfaces/moduleInterfaces';
import constants from '../constants';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
import { USERS_QUERY } from '../graphql/queries/users';

export const routes = [
  {
    path: constants.profile,
    page: <Profile/>,
    type: RouteType.Auth,
  },
  {
    path: constants.users,
    page: <Users query={USERS_QUERY} pageName={constants.users}/>,
    type: RouteType.Auth,
  },

];

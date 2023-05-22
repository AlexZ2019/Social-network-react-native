import { RouteType } from '../../common/interfaces/moduleInterfaces';
import constants from '../constants';
import Users from '../../user/pages/Users';
import { FRIENDS_QUERY } from '../graphql/queries/friends';

export const routes = [
  {
    path: constants.friends,
    page: <Users query={FRIENDS_QUERY} pageName={constants.friends}/>,
    type: RouteType.Auth,
  },
];

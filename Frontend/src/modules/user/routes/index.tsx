import { RouteType } from '../../common/interfaces/moduleInterfaces';
import constants from '../constants';
import Profile from '../pages/Profile';

export const routes = [
  {
    path: constants.profile,
    page: <Profile/>,
    type: RouteType.Auth,
  }];

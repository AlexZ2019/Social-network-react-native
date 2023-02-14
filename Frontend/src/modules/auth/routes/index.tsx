import { RouteType } from '../../common/interfaces/moduleInterfaces';
import LoginPage from '../pages/LoginPage';
import constants from '../constants';

export const routes = [
  {
    path: constants.login,
    page: <LoginPage/>,
    type: RouteType.NotAuth,
  }];

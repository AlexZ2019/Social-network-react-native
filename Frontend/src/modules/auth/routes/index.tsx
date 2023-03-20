import { RouteType } from '../../common/interfaces/moduleInterfaces';
import LoginPage from '../pages/LoginPage';
import constants from '../constants';
import RegistrationPage from '../pages/RegistrationPage';

export const routes = [
  {
    path: constants.login,
    page: <LoginPage/>,
    type: RouteType.NotAuth,
  },
  {
    path: constants.register,
    page: <RegistrationPage/>,
    type: RouteType.NotAuth,
  }];

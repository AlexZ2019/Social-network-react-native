import { RouteType } from '../../common/interfaces/moduleInterfaces';
import constants from '../constants';
import Setting from '../pages/Setting';

export const routes = [
  {
    path: constants.setting,
    page: <Setting/>,
    type: RouteType.Auth,
  }];

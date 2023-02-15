import { RouteType } from '../../common/interfaces/moduleInterfaces';
import News from '../pages/News';
import constants from '../constants';

export const routes = [
  {
    path: constants.news,
    page: <News/>,
    type: RouteType.Auth,
  }];

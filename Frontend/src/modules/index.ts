import { mergeArrays } from '../utils/mergeArrays';
import { IModule } from './common/interfaces/moduleInterfaces';
import auth from './auth';
import news from './News';
import user from './user';
import friend from './friend';

const routes = mergeArrays(auth.routes, news.routes, friend.routes,
  user.routes);
const module: IModule = { routes };
export default module;

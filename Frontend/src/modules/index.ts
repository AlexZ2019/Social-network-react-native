import { mergeArrays } from '../utils/mergeArrays';
import { IModule } from './common/interfaces/moduleInterfaces';
import auth from './auth';
import news from './News';
import user from './user';

const routes = mergeArrays(auth.routes, news.routes, user.routes);
const module: IModule = { routes };
export default module;

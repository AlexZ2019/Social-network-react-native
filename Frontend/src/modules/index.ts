import { mergeArrays } from '../utils/mergeArrays';
import { IModule } from './common/interfaces/moduleInterfaces';
import auth from './auth';
import news from './News';

const routes = mergeArrays(auth.routes, news.routes);
const module: IModule = { routes };
export default module;

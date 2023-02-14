import { mergeArrays } from '../utils/mergeArrays';
import { IModule } from './common/interfaces/moduleInterfaces';
import auth from './auth';

const routes = mergeArrays(auth.routes);
const module: IModule = { routes };
export default module;

import auth from '../auth';
import { mergeArrays } from '../utils/mergeArrays';
import { IModule } from './common/interfaces/moduleInterfaces';

const routes = mergeArrays(auth.routes);

const module: IModule = { routes };
export default module;

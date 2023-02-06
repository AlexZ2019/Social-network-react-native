export enum RouteType {
  Auth = 'Auth',
  Public = 'Public',
  NotAuth = 'NotAuth'
}

export interface IRoute {
  page: FC<ReactNode>;
  path: string;
  type: RouteType;
}

export interface IModule {
  routes: IRoute[];
}

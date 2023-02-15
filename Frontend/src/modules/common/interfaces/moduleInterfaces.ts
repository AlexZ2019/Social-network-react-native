import { ReactElement } from 'react';

export enum RouteType {
  Auth = 'Auth',
  Public = 'Public',
  NotAuth = 'NotAuth'
}

export interface IRoute {
  page: ReactElement;
  path: string;
  type: RouteType;
}

export interface IModule {
  routes: IRoute[];
}

export interface ILogin {
  login: string;
  password: string;
}

export interface IUserInfo {
  sex?: string;
  firstname?: string;
  lastname?: string;
  nickname?: string;
  biography?: string;
}

export interface IRegistration extends ILogin, IUserInfo {}


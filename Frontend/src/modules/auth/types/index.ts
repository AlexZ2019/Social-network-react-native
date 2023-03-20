export interface ILogin {
  login: string;
  password: string;
}

export interface IRegistration extends ILogin {
  sex?: string;
  firstname?: string;
  lastname?: string;
  nickname?: string;
  biography?: string;
}

export interface ILogin {
  username?: string,
  email: string,
  password: string,
  remember: boolean
};

export interface IRegister {
  username: string,
  email: string,
  password: string,
  confirm?: string
};

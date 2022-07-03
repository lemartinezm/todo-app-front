import React from 'react';
import { IUser } from '../models/User/user.model';

interface ILoginContext {
  user: IUser | null | undefined,
  setUser: any,
  token: string,
  setToken: any
}

export const LoginContext = React.createContext<ILoginContext>({
  user: null,
  setUser: null,
  token: '',
  setToken: null
});

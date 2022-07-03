import axios from './config/axios.config';
import { AxiosResponse } from 'axios';
import { ILogin, IRegister } from '../models/Auth/auth.model';

/**
 * Login function
 * @param loginData User Data for login
 * @returns AxiosResponse.data or error
 */
export const login = async (loginData: ILogin) => {
  const response: AxiosResponse = await axios.post('/auth/login', loginData);
  return response.data;
};

/**
 * Register function
 * @param registerData User Data for register
 * @returns AxiosResponse.data or error
 */
export const register = async (registerData: IRegister) => {
  const response: AxiosResponse = await axios.post('/auth/register', registerData);
  return response.data;
};

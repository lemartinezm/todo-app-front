import axios from './config/axios.config';
import { AxiosResponse } from 'axios';
import { ILogin } from '../models/Auth/auth.model';

/**
 * Login function
 * @param loginData User Data for login
 * @returns AxiosResponse.data or error
 */
export const login = async (loginData: ILogin) => {
  const response: AxiosResponse = await axios.post('/auth/login', loginData);
  return response.data;
};

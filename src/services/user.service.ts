import axios from './config/axios.config';
import { AxiosResponse } from 'axios';

/**
 * Verify login function
 * @param token Logged user token
 * @returns AxiosResponse.data or error
 */
export const getUserInfo = async (token: string) => {
  const response: AxiosResponse = await axios.get('/users/me', {
    headers: {
      'x-access-token': token
    }
  });
  return response.data;
};

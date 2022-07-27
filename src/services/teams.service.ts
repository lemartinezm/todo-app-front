import { AxiosResponse } from 'axios';
import { ICreateTeam } from '../models/Teams/teams.model';
import axios from './config/axios.config';

export const getMyTeams = async (token: string) => {
  const response: AxiosResponse = await axios.get('/teams/me', {
    headers: {
      'x-access-token': token
    }
  });

  return response.data;
};

export const createNewTeam = async (token: string, newTeam: ICreateTeam) => {
  const response: AxiosResponse = await axios.post('/teams', newTeam, {
    headers: {
      'x-access-token': token
    }
  });

  return response.data;
};

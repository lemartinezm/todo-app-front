import { AxiosResponse } from 'axios';
import { ICreateTeam } from '../models/Teams/teams.model';
import axios from './config/axios.config';

export const getMyTeams = async (token: string, documentsPerPage?: number, currentPage?: number) => {
  const response: AxiosResponse = await axios.get('/teams/me', {
    headers: {
      'x-access-token': token
    },
    params: {
      documentsPerPage,
      currentPage
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

export const updateTeam = async (token: string, updatedTeam: any) => {
  const response: AxiosResponse = await axios.put('/teams', updatedTeam, {
    headers: {
      'x-access-token': token
    }
  });

  return response.data;
};

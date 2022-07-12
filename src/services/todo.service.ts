import { AxiosResponse } from 'axios';
import axios from './config/axios.config';
import { ICreateTodo } from './interfaces/todo';

export const createTodo = async (todo: ICreateTodo, token: string) => {
  const response: AxiosResponse = await axios.post('/todos', todo, {
    headers: {
      'x-access-token': token
    }
  });
  return response.data;
};

export const updateTodoById = async (todoId: string, todoUpdated: any, token: string) => {
  const response: AxiosResponse = await axios.put('/todos', todoUpdated, {
    headers: {
      'x-access-token': token
    },
    params: {
      id: todoId
    }
  });
  return response.data;
};

export const getMyTodos = async (token: string, documentsPerPage?: number, currentPage?: number) => {
  const response: AxiosResponse = await axios.get('/todos/me', {
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

export const deleteTodoById = async (token: string, todoId: string) => {
  const response: AxiosResponse = await axios.delete('/todos', {
    headers: {
      'x-access-token': token
    },
    params: {
      id: todoId
    }
  });
  return response.data;
};

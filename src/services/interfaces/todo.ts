import { ITodo, TodoPriority } from '../../models/Todo/todo.model';

export interface ICreateTodo {
  name: string,
  description?: string,
  deadline?: Date,
  priority: TodoPriority,
  teamId?: string
};

export interface ITodoResponse {
  meta?: any,
  message?: string,
  todos?: ITodo[],
  status: number
};

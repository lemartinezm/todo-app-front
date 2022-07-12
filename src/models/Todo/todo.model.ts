
export enum TodoPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high'
}

export interface ITodo {
  _id: string,
  name: string,
  description: string,
  createdAt: Date,
  deadline: Date,
  priority: TodoPriority,
  completed: boolean,
  creator: string | number,
  __v: number
};


export enum TodoPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high'
}

export interface ITodo {
  _id: string | number,
  name: string,
  description: string,
  createdAt: Date,
  finishBefore: Date,
  priority: TodoPriority,
  completed: boolean,
  creator: string | number,
  __v: number
};

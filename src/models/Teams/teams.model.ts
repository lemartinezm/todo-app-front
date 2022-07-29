export interface ITeam {
  _id: string,
  name: string,
  leader: string,
  participants: any[],
  todos: any[],
  meta?: any,
  __v: number
}

export interface ICreateTeam {
  name: string,
  leader: string,
  participants?: any[],
  todos?: any[]
}

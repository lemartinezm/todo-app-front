import { ITeam } from '../../models/Teams/teams.model';

export interface ITeamResponse {
  status: number,
  message?: string,
  teams?: ITeam[]
}

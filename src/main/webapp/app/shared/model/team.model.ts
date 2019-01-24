import { IGoal } from 'app/shared/model//goal.model';
import { ITeamMember } from 'app/shared/model//team-member.model';

export interface ITeam {
    id?: number;
    name?: string;
    goal?: IGoal;
    members?: ITeamMember[];
}

export class Team implements ITeam {
    constructor(public id?: number, public name?: string, public goal?: IGoal, public members?: ITeamMember[]) {}
}

import { IAcceptanceCriteria } from 'app/shared/model//acceptance-criteria.model';
import { ITeam } from 'app/shared/model//team.model';

export interface IGoal {
    id?: number;
    title?: string;
    acceptanceCriteria?: IAcceptanceCriteria[];
    teams?: ITeam[];
}

export class Goal implements IGoal {
    constructor(public id?: number, public title?: string, public acceptanceCriteria?: IAcceptanceCriteria[], public teams?: ITeam[]) {}
}

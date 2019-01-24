import { IAcceptanceCriteria } from 'app/shared/model//acceptance-criteria.model';
import { ITeamMember } from 'app/shared/model//team-member.model';

export interface ITask {
    id?: number;
    title?: string;
    description?: string;
    acceptanceCriteria?: IAcceptanceCriteria;
    teamMembers?: ITeamMember[];
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public acceptanceCriteria?: IAcceptanceCriteria,
        public teamMembers?: ITeamMember[]
    ) {}
}

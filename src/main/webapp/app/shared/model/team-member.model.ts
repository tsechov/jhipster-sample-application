import { ITeam } from 'app/shared/model//team.model';
import { ITask } from 'app/shared/model//task.model';

export interface ITeamMember {
    id?: number;
    name?: string;
    role?: string;
    phone?: string;
    email?: string;
    team?: ITeam;
    tasks?: ITask[];
}

export class TeamMember implements ITeamMember {
    constructor(
        public id?: number,
        public name?: string,
        public role?: string,
        public phone?: string,
        public email?: string,
        public team?: ITeam,
        public tasks?: ITask[]
    ) {}
}

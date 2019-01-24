import { IGoal } from 'app/shared/model//goal.model';
import { ITask } from 'app/shared/model//task.model';

export interface IAcceptanceCriteria {
    id?: number;
    title?: string;
    description?: string;
    goal?: IGoal;
    tasks?: ITask[];
}

export class AcceptanceCriteria implements IAcceptanceCriteria {
    constructor(public id?: number, public title?: string, public description?: string, public goal?: IGoal, public tasks?: ITask[]) {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITeamMember } from 'app/shared/model/team-member.model';
import { TeamMemberService } from './team-member.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task';

@Component({
    selector: 'jhi-team-member-update',
    templateUrl: './team-member-update.component.html'
})
export class TeamMemberUpdateComponent implements OnInit {
    teamMember: ITeamMember;
    isSaving: boolean;

    teams: ITeam[];

    tasks: ITask[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected teamMemberService: TeamMemberService,
        protected teamService: TeamService,
        protected taskService: TaskService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teamMember }) => {
            this.teamMember = teamMember;
        });
        this.teamService.query().subscribe(
            (res: HttpResponse<ITeam[]>) => {
                this.teams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.taskService.query().subscribe(
            (res: HttpResponse<ITask[]>) => {
                this.tasks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.teamMember.id !== undefined) {
            this.subscribeToSaveResponse(this.teamMemberService.update(this.teamMember));
        } else {
            this.subscribeToSaveResponse(this.teamMemberService.create(this.teamMember));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeamMember>>) {
        result.subscribe((res: HttpResponse<ITeamMember>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTeamById(index: number, item: ITeam) {
        return item.id;
    }

    trackTaskById(index: number, item: ITask) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITask } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { IAcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';
import { AcceptanceCriteriaService } from 'app/entities/acceptance-criteria';
import { ITeamMember } from 'app/shared/model/team-member.model';
import { TeamMemberService } from 'app/entities/team-member';

@Component({
    selector: 'jhi-task-update',
    templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
    task: ITask;
    isSaving: boolean;

    acceptancecriteria: IAcceptanceCriteria[];

    teammembers: ITeamMember[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected taskService: TaskService,
        protected acceptanceCriteriaService: AcceptanceCriteriaService,
        protected teamMemberService: TeamMemberService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
        });
        this.acceptanceCriteriaService.query().subscribe(
            (res: HttpResponse<IAcceptanceCriteria[]>) => {
                this.acceptancecriteria = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.teamMemberService.query().subscribe(
            (res: HttpResponse<ITeamMember[]>) => {
                this.teammembers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(this.taskService.create(this.task));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
        result.subscribe((res: HttpResponse<ITask>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAcceptanceCriteriaById(index: number, item: IAcceptanceCriteria) {
        return item.id;
    }

    trackTeamMemberById(index: number, item: ITeamMember) {
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

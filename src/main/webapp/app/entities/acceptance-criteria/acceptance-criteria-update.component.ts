import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';
import { AcceptanceCriteriaService } from './acceptance-criteria.service';
import { IGoal } from 'app/shared/model/goal.model';
import { GoalService } from 'app/entities/goal';

@Component({
    selector: 'jhi-acceptance-criteria-update',
    templateUrl: './acceptance-criteria-update.component.html'
})
export class AcceptanceCriteriaUpdateComponent implements OnInit {
    acceptanceCriteria: IAcceptanceCriteria;
    isSaving: boolean;

    goals: IGoal[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected acceptanceCriteriaService: AcceptanceCriteriaService,
        protected goalService: GoalService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acceptanceCriteria }) => {
            this.acceptanceCriteria = acceptanceCriteria;
        });
        this.goalService.query().subscribe(
            (res: HttpResponse<IGoal[]>) => {
                this.goals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.acceptanceCriteria.id !== undefined) {
            this.subscribeToSaveResponse(this.acceptanceCriteriaService.update(this.acceptanceCriteria));
        } else {
            this.subscribeToSaveResponse(this.acceptanceCriteriaService.create(this.acceptanceCriteria));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcceptanceCriteria>>) {
        result.subscribe((res: HttpResponse<IAcceptanceCriteria>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGoalById(index: number, item: IGoal) {
        return item.id;
    }
}

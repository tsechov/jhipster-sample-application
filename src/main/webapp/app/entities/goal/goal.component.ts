import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGoal } from 'app/shared/model/goal.model';
import { AccountService } from 'app/core';
import { GoalService } from './goal.service';

@Component({
    selector: 'jhi-goal',
    templateUrl: './goal.component.html'
})
export class GoalComponent implements OnInit, OnDestroy {
    goals: IGoal[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected goalService: GoalService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.goalService.query().subscribe(
            (res: HttpResponse<IGoal[]>) => {
                this.goals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGoals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGoal) {
        return item.id;
    }

    registerChangeInGoals() {
        this.eventSubscriber = this.eventManager.subscribe('goalListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

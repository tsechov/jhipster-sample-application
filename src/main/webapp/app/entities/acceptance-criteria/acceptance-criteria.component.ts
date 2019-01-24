import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';
import { AccountService } from 'app/core';
import { AcceptanceCriteriaService } from './acceptance-criteria.service';

@Component({
    selector: 'jhi-acceptance-criteria',
    templateUrl: './acceptance-criteria.component.html'
})
export class AcceptanceCriteriaComponent implements OnInit, OnDestroy {
    acceptanceCriteria: IAcceptanceCriteria[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected acceptanceCriteriaService: AcceptanceCriteriaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.acceptanceCriteriaService.query().subscribe(
            (res: HttpResponse<IAcceptanceCriteria[]>) => {
                this.acceptanceCriteria = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAcceptanceCriteria();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAcceptanceCriteria) {
        return item.id;
    }

    registerChangeInAcceptanceCriteria() {
        this.eventSubscriber = this.eventManager.subscribe('acceptanceCriteriaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

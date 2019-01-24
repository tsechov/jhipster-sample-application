import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITeamMember } from 'app/shared/model/team-member.model';
import { AccountService } from 'app/core';
import { TeamMemberService } from './team-member.service';

@Component({
    selector: 'jhi-team-member',
    templateUrl: './team-member.component.html'
})
export class TeamMemberComponent implements OnInit, OnDestroy {
    teamMembers: ITeamMember[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected teamMemberService: TeamMemberService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.teamMemberService.query().subscribe(
            (res: HttpResponse<ITeamMember[]>) => {
                this.teamMembers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTeamMembers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITeamMember) {
        return item.id;
    }

    registerChangeInTeamMembers() {
        this.eventSubscriber = this.eventManager.subscribe('teamMemberListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

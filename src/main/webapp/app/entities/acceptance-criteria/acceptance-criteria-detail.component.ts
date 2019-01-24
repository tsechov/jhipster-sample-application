import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';

@Component({
    selector: 'jhi-acceptance-criteria-detail',
    templateUrl: './acceptance-criteria-detail.component.html'
})
export class AcceptanceCriteriaDetailComponent implements OnInit {
    acceptanceCriteria: IAcceptanceCriteria;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acceptanceCriteria }) => {
            this.acceptanceCriteria = acceptanceCriteria;
        });
    }

    previousState() {
        window.history.back();
    }
}

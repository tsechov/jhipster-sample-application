import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';
import { AcceptanceCriteriaService } from './acceptance-criteria.service';

@Component({
    selector: 'jhi-acceptance-criteria-delete-dialog',
    templateUrl: './acceptance-criteria-delete-dialog.component.html'
})
export class AcceptanceCriteriaDeleteDialogComponent {
    acceptanceCriteria: IAcceptanceCriteria;

    constructor(
        protected acceptanceCriteriaService: AcceptanceCriteriaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acceptanceCriteriaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'acceptanceCriteriaListModification',
                content: 'Deleted an acceptanceCriteria'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acceptance-criteria-delete-popup',
    template: ''
})
export class AcceptanceCriteriaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ acceptanceCriteria }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AcceptanceCriteriaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.acceptanceCriteria = acceptanceCriteria;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

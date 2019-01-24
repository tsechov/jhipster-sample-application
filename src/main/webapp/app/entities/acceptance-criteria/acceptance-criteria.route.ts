import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';
import { AcceptanceCriteriaService } from './acceptance-criteria.service';
import { AcceptanceCriteriaComponent } from './acceptance-criteria.component';
import { AcceptanceCriteriaDetailComponent } from './acceptance-criteria-detail.component';
import { AcceptanceCriteriaUpdateComponent } from './acceptance-criteria-update.component';
import { AcceptanceCriteriaDeletePopupComponent } from './acceptance-criteria-delete-dialog.component';
import { IAcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';

@Injectable({ providedIn: 'root' })
export class AcceptanceCriteriaResolve implements Resolve<IAcceptanceCriteria> {
    constructor(private service: AcceptanceCriteriaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AcceptanceCriteria> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AcceptanceCriteria>) => response.ok),
                map((acceptanceCriteria: HttpResponse<AcceptanceCriteria>) => acceptanceCriteria.body)
            );
        }
        return of(new AcceptanceCriteria());
    }
}

export const acceptanceCriteriaRoute: Routes = [
    {
        path: 'acceptance-criteria',
        component: AcceptanceCriteriaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AcceptanceCriteria'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acceptance-criteria/:id/view',
        component: AcceptanceCriteriaDetailComponent,
        resolve: {
            acceptanceCriteria: AcceptanceCriteriaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AcceptanceCriteria'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acceptance-criteria/new',
        component: AcceptanceCriteriaUpdateComponent,
        resolve: {
            acceptanceCriteria: AcceptanceCriteriaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AcceptanceCriteria'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'acceptance-criteria/:id/edit',
        component: AcceptanceCriteriaUpdateComponent,
        resolve: {
            acceptanceCriteria: AcceptanceCriteriaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AcceptanceCriteria'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const acceptanceCriteriaPopupRoute: Routes = [
    {
        path: 'acceptance-criteria/:id/delete',
        component: AcceptanceCriteriaDeletePopupComponent,
        resolve: {
            acceptanceCriteria: AcceptanceCriteriaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AcceptanceCriteria'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

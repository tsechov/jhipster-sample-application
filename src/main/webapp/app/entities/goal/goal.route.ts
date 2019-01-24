import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Goal } from 'app/shared/model/goal.model';
import { GoalService } from './goal.service';
import { GoalComponent } from './goal.component';
import { GoalDetailComponent } from './goal-detail.component';
import { GoalUpdateComponent } from './goal-update.component';
import { GoalDeletePopupComponent } from './goal-delete-dialog.component';
import { IGoal } from 'app/shared/model/goal.model';

@Injectable({ providedIn: 'root' })
export class GoalResolve implements Resolve<IGoal> {
    constructor(private service: GoalService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Goal> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Goal>) => response.ok),
                map((goal: HttpResponse<Goal>) => goal.body)
            );
        }
        return of(new Goal());
    }
}

export const goalRoute: Routes = [
    {
        path: 'goal',
        component: GoalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Goals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'goal/:id/view',
        component: GoalDetailComponent,
        resolve: {
            goal: GoalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Goals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'goal/new',
        component: GoalUpdateComponent,
        resolve: {
            goal: GoalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Goals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'goal/:id/edit',
        component: GoalUpdateComponent,
        resolve: {
            goal: GoalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Goals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const goalPopupRoute: Routes = [
    {
        path: 'goal/:id/delete',
        component: GoalDeletePopupComponent,
        resolve: {
            goal: GoalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Goals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Team } from 'app/shared/model/team.model';
import { TeamService } from './team.service';
import { TeamComponent } from './team.component';
import { TeamDetailComponent } from './team-detail.component';
import { TeamUpdateComponent } from './team-update.component';
import { TeamDeletePopupComponent } from './team-delete-dialog.component';
import { ITeam } from 'app/shared/model/team.model';

@Injectable({ providedIn: 'root' })
export class TeamResolve implements Resolve<ITeam> {
    constructor(private service: TeamService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Team>) => response.ok),
                map((team: HttpResponse<Team>) => team.body)
            );
        }
        return of(new Team());
    }
}

export const teamRoute: Routes = [
    {
        path: 'team',
        component: TeamComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teams'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team/:id/view',
        component: TeamDetailComponent,
        resolve: {
            team: TeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teams'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team/new',
        component: TeamUpdateComponent,
        resolve: {
            team: TeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teams'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team/:id/edit',
        component: TeamUpdateComponent,
        resolve: {
            team: TeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teams'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teamPopupRoute: Routes = [
    {
        path: 'team/:id/delete',
        component: TeamDeletePopupComponent,
        resolve: {
            team: TeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

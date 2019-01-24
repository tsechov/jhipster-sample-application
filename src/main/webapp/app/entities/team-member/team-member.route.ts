import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TeamMember } from 'app/shared/model/team-member.model';
import { TeamMemberService } from './team-member.service';
import { TeamMemberComponent } from './team-member.component';
import { TeamMemberDetailComponent } from './team-member-detail.component';
import { TeamMemberUpdateComponent } from './team-member-update.component';
import { TeamMemberDeletePopupComponent } from './team-member-delete-dialog.component';
import { ITeamMember } from 'app/shared/model/team-member.model';

@Injectable({ providedIn: 'root' })
export class TeamMemberResolve implements Resolve<ITeamMember> {
    constructor(private service: TeamMemberService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TeamMember> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TeamMember>) => response.ok),
                map((teamMember: HttpResponse<TeamMember>) => teamMember.body)
            );
        }
        return of(new TeamMember());
    }
}

export const teamMemberRoute: Routes = [
    {
        path: 'team-member',
        component: TeamMemberComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TeamMembers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team-member/:id/view',
        component: TeamMemberDetailComponent,
        resolve: {
            teamMember: TeamMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TeamMembers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team-member/new',
        component: TeamMemberUpdateComponent,
        resolve: {
            teamMember: TeamMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TeamMembers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team-member/:id/edit',
        component: TeamMemberUpdateComponent,
        resolve: {
            teamMember: TeamMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TeamMembers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teamMemberPopupRoute: Routes = [
    {
        path: 'team-member/:id/delete',
        component: TeamMemberDeletePopupComponent,
        resolve: {
            teamMember: TeamMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TeamMembers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

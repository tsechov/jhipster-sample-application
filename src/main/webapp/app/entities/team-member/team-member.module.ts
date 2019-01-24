import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    TeamMemberComponent,
    TeamMemberDetailComponent,
    TeamMemberUpdateComponent,
    TeamMemberDeletePopupComponent,
    TeamMemberDeleteDialogComponent,
    teamMemberRoute,
    teamMemberPopupRoute
} from './';

const ENTITY_STATES = [...teamMemberRoute, ...teamMemberPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TeamMemberComponent,
        TeamMemberDetailComponent,
        TeamMemberUpdateComponent,
        TeamMemberDeleteDialogComponent,
        TeamMemberDeletePopupComponent
    ],
    entryComponents: [TeamMemberComponent, TeamMemberUpdateComponent, TeamMemberDeleteDialogComponent, TeamMemberDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTeamMemberModule {}

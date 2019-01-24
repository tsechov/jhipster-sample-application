import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    AcceptanceCriteriaComponent,
    AcceptanceCriteriaDetailComponent,
    AcceptanceCriteriaUpdateComponent,
    AcceptanceCriteriaDeletePopupComponent,
    AcceptanceCriteriaDeleteDialogComponent,
    acceptanceCriteriaRoute,
    acceptanceCriteriaPopupRoute
} from './';

const ENTITY_STATES = [...acceptanceCriteriaRoute, ...acceptanceCriteriaPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AcceptanceCriteriaComponent,
        AcceptanceCriteriaDetailComponent,
        AcceptanceCriteriaUpdateComponent,
        AcceptanceCriteriaDeleteDialogComponent,
        AcceptanceCriteriaDeletePopupComponent
    ],
    entryComponents: [
        AcceptanceCriteriaComponent,
        AcceptanceCriteriaUpdateComponent,
        AcceptanceCriteriaDeleteDialogComponent,
        AcceptanceCriteriaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationAcceptanceCriteriaModule {}

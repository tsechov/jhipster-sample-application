import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationGoalModule } from './goal/goal.module';
import { JhipsterSampleApplicationAcceptanceCriteriaModule } from './acceptance-criteria/acceptance-criteria.module';
import { JhipsterSampleApplicationTeamModule } from './team/team.module';
import { JhipsterSampleApplicationTeamMemberModule } from './team-member/team-member.module';
import { JhipsterSampleApplicationTaskModule } from './task/task.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterSampleApplicationGoalModule,
        JhipsterSampleApplicationAcceptanceCriteriaModule,
        JhipsterSampleApplicationTeamModule,
        JhipsterSampleApplicationTeamMemberModule,
        JhipsterSampleApplicationTaskModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TeamComponent } from 'app/entities/team/team.component';
import { TeamService } from 'app/entities/team/team.service';
import { Team } from 'app/shared/model/team.model';

describe('Component Tests', () => {
    describe('Team Management Component', () => {
        let comp: TeamComponent;
        let fixture: ComponentFixture<TeamComponent>;
        let service: TeamService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TeamComponent],
                providers: []
            })
                .overrideTemplate(TeamComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TeamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Team(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.teams[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

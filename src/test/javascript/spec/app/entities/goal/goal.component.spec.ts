/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { GoalComponent } from 'app/entities/goal/goal.component';
import { GoalService } from 'app/entities/goal/goal.service';
import { Goal } from 'app/shared/model/goal.model';

describe('Component Tests', () => {
    describe('Goal Management Component', () => {
        let comp: GoalComponent;
        let fixture: ComponentFixture<GoalComponent>;
        let service: GoalService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [GoalComponent],
                providers: []
            })
                .overrideTemplate(GoalComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GoalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GoalService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Goal(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.goals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

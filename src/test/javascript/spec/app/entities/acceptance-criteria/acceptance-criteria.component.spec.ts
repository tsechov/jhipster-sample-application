/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AcceptanceCriteriaComponent } from 'app/entities/acceptance-criteria/acceptance-criteria.component';
import { AcceptanceCriteriaService } from 'app/entities/acceptance-criteria/acceptance-criteria.service';
import { AcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';

describe('Component Tests', () => {
    describe('AcceptanceCriteria Management Component', () => {
        let comp: AcceptanceCriteriaComponent;
        let fixture: ComponentFixture<AcceptanceCriteriaComponent>;
        let service: AcceptanceCriteriaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AcceptanceCriteriaComponent],
                providers: []
            })
                .overrideTemplate(AcceptanceCriteriaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AcceptanceCriteriaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcceptanceCriteriaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AcceptanceCriteria(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.acceptanceCriteria[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

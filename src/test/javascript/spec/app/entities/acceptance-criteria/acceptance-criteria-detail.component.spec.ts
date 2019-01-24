/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AcceptanceCriteriaDetailComponent } from 'app/entities/acceptance-criteria/acceptance-criteria-detail.component';
import { AcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';

describe('Component Tests', () => {
    describe('AcceptanceCriteria Management Detail Component', () => {
        let comp: AcceptanceCriteriaDetailComponent;
        let fixture: ComponentFixture<AcceptanceCriteriaDetailComponent>;
        const route = ({ data: of({ acceptanceCriteria: new AcceptanceCriteria(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AcceptanceCriteriaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AcceptanceCriteriaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcceptanceCriteriaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.acceptanceCriteria).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

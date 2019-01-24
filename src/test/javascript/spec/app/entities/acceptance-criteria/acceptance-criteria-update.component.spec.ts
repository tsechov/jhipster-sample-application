/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AcceptanceCriteriaUpdateComponent } from 'app/entities/acceptance-criteria/acceptance-criteria-update.component';
import { AcceptanceCriteriaService } from 'app/entities/acceptance-criteria/acceptance-criteria.service';
import { AcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';

describe('Component Tests', () => {
    describe('AcceptanceCriteria Management Update Component', () => {
        let comp: AcceptanceCriteriaUpdateComponent;
        let fixture: ComponentFixture<AcceptanceCriteriaUpdateComponent>;
        let service: AcceptanceCriteriaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AcceptanceCriteriaUpdateComponent]
            })
                .overrideTemplate(AcceptanceCriteriaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AcceptanceCriteriaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcceptanceCriteriaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AcceptanceCriteria(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.acceptanceCriteria = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AcceptanceCriteria();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.acceptanceCriteria = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { AcceptanceCriteriaDeleteDialogComponent } from 'app/entities/acceptance-criteria/acceptance-criteria-delete-dialog.component';
import { AcceptanceCriteriaService } from 'app/entities/acceptance-criteria/acceptance-criteria.service';

describe('Component Tests', () => {
    describe('AcceptanceCriteria Management Delete Component', () => {
        let comp: AcceptanceCriteriaDeleteDialogComponent;
        let fixture: ComponentFixture<AcceptanceCriteriaDeleteDialogComponent>;
        let service: AcceptanceCriteriaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [AcceptanceCriteriaDeleteDialogComponent]
            })
                .overrideTemplate(AcceptanceCriteriaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AcceptanceCriteriaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcceptanceCriteriaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

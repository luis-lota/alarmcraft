import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlertsComponent } from './modal-alerts.component';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder } from '@angular/forms';

describe('ModalAlertsComponent', () => {
  let component: ModalAlertsComponent;
  let fixture: ComponentFixture<ModalAlertsComponent>;
  let modalServiceMock: Partial<NgbModal>;
  let formBuilder: FormBuilder;

  modalServiceMock = {
    open: () => ({} as NgbModalRef),
    dismissAll: () => ({} as NgbModalRef),
  };

  beforeEach(async () => {
    formBuilder = new FormBuilder();
    await TestBed.configureTestingModule({
      declarations: [ModalAlertsComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty data', () => {
    component.data = {
      content: '',
      due: {
        date: '',
      },
      priority: 1,
      added_at: '',
      id: '',
    };

    component.ngOnInit();

    const contentControl = component.formAlerts.get('content');
    const dueDateControl = component.formAlerts.get('dueDate');

    expect(contentControl?.value).toEqual('');
    expect(contentControl?.hasError('required')).toBeTruthy();
    expect(dueDateControl?.value).toEqual(component.defaultDueDate);
  });

  it('should initialize the form with data', () => {
    const testData = {
      content: 'light',
      due: {
        date: '2023-10-02',
      },
      priority: 1,
      added_at: '',
      id: '1',
    };

    component.ngOnInit();

    const contentControl = component.formAlerts.get('content');
    const dueDateControl = component.formAlerts.get('dueDate');

    contentControl?.patchValue(testData.content);
    dueDateControl?.patchValue(testData.due.date);

    expect(contentControl?.value).toEqual(testData.content);
    expect(dueDateControl?.value).toEqual(testData.due.date);
  });
});

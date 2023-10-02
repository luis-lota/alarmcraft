import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Alerts, FormAlarms, OPERATION } from '../../models/alerts';

@Component({
  selector: 'app-modal-alerts',
  templateUrl: './modal-alerts.component.html',
  styleUrls: ['./modal-alerts.component.scss'],
})
export class ModalAlertsComponent implements OnInit {
  formAlerts!: FormGroup;
  @Input() data!: Alerts;
  @Output() formUserAlertsSubmit: EventEmitter<any> = new EventEmitter();
  submit: boolean = false;

  defaultDueDate: string = new Date().toISOString().substring(0, 10);

  minDateDue: Date = new Date();

  ngOnInit(): void {
    this.formAlerts = this.fb.group({
      content: [
        this.data !== null && this.data?.content ? this.data?.content : '',
        Validators.required,
      ],
      dueDate: [
        this.data !== null && this.data?.due !== null && this.data?.due.date
          ? this.data?.due.date
          : this.defaultDueDate,
      ],
    });
  }

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  onCancel(): void {
    this.modalService.dismissAll();
  }

  onSubmit(): void {
    this.submit = true;
    if (this.formAlerts.valid) {
      const date = this.formAlerts.get('dueDate')?.value;
      const dataFormat = this.handlerFormData(date);

      this.formUserAlertsSubmit.emit({
        event: this.data !== null ? OPERATION.EDIT : OPERATION.ADD,
        body: dataFormat,
        id: this.data !== null && this.data.id,
      });

      this.closeModal();
      this.resetForm();
    }
  }

  handlerFormData(date: string): FormAlarms {
    return {
      content: this.formAlerts.get('content')?.value,
      due_date: date != '' ? this.formatDate(date) : '',
      priority: this.formAlerts.get('priority')?.value,
    };
  }

  formatDate(date: string): String {
    const currentDate = new Date(date);
    const formattedDate = currentDate.toISOString().slice(0, 10);
    return formattedDate;
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  resetForm(): void {
    this.formAlerts.reset();
  }
}

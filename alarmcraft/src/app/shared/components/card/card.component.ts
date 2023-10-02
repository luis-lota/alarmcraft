import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Alerts } from '../../models/alerts';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() data: Alerts = {
    content: '',
    due: { date: '' },
    priority: 1,
    completed: false,
    added_at: '',
    id: '',
  };

  @Input() complete: boolean = false;

  @Output() alertDelete: EventEmitter<string | number> =
    new EventEmitter<any>();

  @Output() alertEdit: EventEmitter<Alerts> = new EventEmitter<Alerts>();

  @Output() alertUndo: EventEmitter<Alerts> = new EventEmitter<Alerts>();
  
  @Output() changeToCompleteTaks: EventEmitter<Alerts> =
    new EventEmitter<Alerts>();

  constructor() {}

  eventDelete(): void {
    this.alertDelete.emit(this.data.id || '');
  }

  eventEdit(): void {
    this.alertEdit.emit(this.data || {});
  }

  onComplete(): void {
    this.changeToCompleteTaks.emit(this.data);
  }

  onUndo(): void {
    this.alertUndo.emit(this.data);
  }
}

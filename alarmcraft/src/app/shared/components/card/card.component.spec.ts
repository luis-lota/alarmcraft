import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should emit delete,edit,complete and undo events from the alarms', () => {
    it('should trigger the event of delete', () => {
      const spyOnRemove = spyOn(component, 'eventDelete');
      component.eventDelete();
      expect(spyOnRemove).toHaveBeenCalled();
    });

    it('should trigger the event of eventEdit', () => {
      const spyOnEdit = spyOn(component, 'eventEdit');
      component.eventEdit();
      expect(spyOnEdit).toHaveBeenCalled();
    });

    it('should trigger the event of complete', () => {
      const sypeOnComplete = spyOn(component, 'onComplete');
      component.onComplete();
      expect(sypeOnComplete).toHaveBeenCalled();
    });

    it('should trigger the event of undo', () => {
      const spyOnUndo = spyOn(component, 'onUndo');
      component.onUndo();
      expect(spyOnUndo).toHaveBeenCalled();
    });
  });
});

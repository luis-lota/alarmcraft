import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Store, StoreModule } from '@ngrx/store';

import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';

import { UserProfileAlertsActions } from 'src/app/shared/store/actions';

import { SharedModule } from 'src/app/shared/shared.module';

import { EffectsModule } from '@ngrx/effects';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InjectionToken } from '@angular/core';

import { reducers } from 'src/app/core/reducers';

import { AlertFeatureEffects } from 'src/app/shared/store/effects';

import { OPERATION } from 'src/app/shared/models/alerts';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let storeMock: Partial<Store>;
  let modalServiceMock: Partial<NgbModal>;
  let store: jasmine.SpyObj<Store>;

  const SHARED_REDUCER = new InjectionToken<unknown>('Root Reducer', {
    factory: () => reducers,
  });

  beforeEach(async () => {
    storeMock = {
      select: (selector: any) => of(),
      dispatch: jasmine.createSpy('dispatch'),
    };

    modalServiceMock = {
      open: () => ({} as NgbModalRef),
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        StoreModule.forRoot(SHARED_REDUCER),
        EffectsModule.forRoot([AlertFeatureEffects]),
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: NgbModal, useValue: modalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;

    fixture.detectChanges();
  });

  it('should create dashboard component', () => {
    expect(component).toBeTruthy();
  });

  describe('init dashboard logic', () => {
    it('should initialize todoList, completedTasks, and incompleteTasks', () => {
      expect(component.todoList).toBeDefined();
      expect(component.completedTasks).toBeDefined();
      expect(component.incompleteTasks).toBeDefined();
      expect(component.recentedAddAlert).toBeDefined();
      expect(component.todoColumnId).toBeDefined();
      expect(component.completedColumnId).toBeDefined();
    });
  });

  describe('get list of the tasks', () => {
    it('should call getAlarms when successAction is true', () => {
      spyOn(store, 'select').and.returnValue(of(true));
      spyOn(component, 'getAlarms').and.callThrough();
    });

    it('should call get alarms in the constructor', () => {
      spyOn(component, 'getAlarms').and.callThrough();
    });
  });

  describe('testing states of the alarm by store', () => {
    it('should be true the success when the state is true ', () => {
      const successMock$ = of(true);
      successMock$.subscribe((success) => {
        expect(success).toBe(true);
      });
    });

    it('should be true the false when the state is false ', () => {
      const successMock$ = of(false);
      successMock$.subscribe((success) => {
        expect(success).toBe(false);
      });
    });

    it('should dispatch initEditMode action when success is true', () => {
      const successMock$ = of(true);

      successMock$.subscribe((value) => {
        if (value) {
          component.putInitMode();
          expect(storeMock.dispatch).toHaveBeenCalledWith(
            UserProfileAlertsActions.initEditMode({ actionSuccess: false })
          );
        }
      });
    });
  });

  describe('should call the events add,edit,delete,undo,complete', () => {
    it('should call onHandlerUndo', () => {
      const event = { task_id: '1' };
      component.onHandlerUndo(event);
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        UserProfileAlertsActions.putUserAlertToReopenAPI$({
          id: event.task_id,
        })
      );
    });

    it('should call onHandlerChange', () => {
      const event = { content: 'pay the bill', id: '1' };
      component.onHandlerChange(event);

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        UserProfileAlertsActions.putUserAlertToCloseAPI$({
          id: event.id,
        })
      );
    });

    it('should call onHandlerEdit', () => {
      const openDialogSpy = spyOn(component, 'openDialog');
      const event = { content: 'pay the bill', id: '1' };
      component.onHandlerEdit(event);

      expect(openDialogSpy).toHaveBeenCalledWith(OPERATION.EDIT);
    });

    it('should dispatch postUserAlertAPI$ when event is OPERATION.ADD', () => {
      component.onHandlerCreateTaks({
        content: 'pay the bill',
        id: '1',
      });

      const data = {
        event: OPERATION.ADD,
        body: {
          content: 'pay the bill',
          id: '1',
          due: { date: '' },
          priority: 1,
          added_at: '',
        },
        id: '1',
      };

      component.onHandlerCreateTaks(data);

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        UserProfileAlertsActions.postUserAlertAPI$({ body: data.body })
      );
    });

    it('should dispatch postUserAlertAPI$ when event is OPERATION.EDIT', () => {
      component.onHandlerCreateTaks({
        content: 'pay the bill',
        id: '1',
      });

      const data = {
        event: OPERATION.EDIT,
        body: {
          content: 'pay the bill',
          id: '1',
          due: { date: '' },
          priority: 1,
          added_at: '',
        },
        id: '1',
      };

      component.onHandlerCreateTaks(data);

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        UserProfileAlertsActions.UpdateUserAlertAPI$({
          body: data.body,
          id: data.id,
        })
      );
    });
  });
});

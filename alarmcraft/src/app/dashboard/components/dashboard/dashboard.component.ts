import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { AppState } from 'src/app/core/reducers';

import { UserProfileAlertsActions } from 'src/app/shared/store/actions';

import { UserAlertsSelector } from 'src/app/shared/store/selectors';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Alerts, COLUMNS, OPERATION } from 'src/app/shared/models/alerts';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  @ViewChild('modalTemplate') modalTemplate!: ElementRef;
  modalRef: NgbModalRef | undefined;

  todoList: Alerts[] = [];

  alertsResults$: Observable<Array<Alerts>>;
  alertsSub!: Subscription;

  success$!: Observable<boolean>;
  successSub!: Subscription;

  successAction$!: Observable<boolean>;
  successActionSub!: Subscription;

  errorActions$!: Observable<any>;
  errorActionsSub!: Subscription;

  loading$!: Observable<boolean>;
  loadingSub!: Subscription;

  loadingCompleteTasks$!: Observable<boolean>;

  alertForm: any = null;

  selectUserListOfAlert$!: Observable<Array<Alerts>>;
  selectUserListOfAlertSub!: Subscription;

  completedTasks: Alerts[] = [];
  incompleteTasks: Alerts[] = [];

  recentedAddAlert: any = [];

  todoColumnId = COLUMNS.TODO;
  completedColumnId = COLUMNS.COMPLETED;

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
  ) {
    this.alertsResults$ = this.store.select(
      UserAlertsSelector.selectUseralertsResults
    );

    this.success$ = this.store.select(
      UserAlertsSelector.selectUseralertsSuccess
    );

    this.errorActions$ = this.store.select(
      UserAlertsSelector.selectUseralertsError
    );

    this.loading$ = this.store.select(
      UserAlertsSelector.selectUseralertsLoading
    );

    this.loadingCompleteTasks$ = this.store.select(
      UserAlertsSelector.selectUserAlertsCompletedLoading
    );

    this.selectUserListOfAlert$ = this.store.select(
      UserAlertsSelector.selectUserListOfAlert
    );

    this.selectUserListOfAlertSub = this.selectUserListOfAlert$.subscribe(
      (list) => {
        this.todoList = list !== null ? [...list] : [];
        this.completedTasks = this.todoList.filter((task) => task.completed);
        this.incompleteTasks = this.todoList.filter((task) => !task.completed);

        this.recentedAddAlert =
          this.todoList.sort((a, b) => {
            const dateInicial: any = new Date(a.added_at);
            const dateEnded: any = new Date(b.added_at);

            return dateEnded - dateInicial;
          })[0] || null;
      }
    );

    this.successAction$ = this.store.select(
      UserAlertsSelector.selectUseralertsActionSuccess
    );

    this.successActionSub = this.successAction$.subscribe((successAction) => {
      if (successAction) {
        this.openSnackBar('Update alarm!', 'success!', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
        this.getAlarms();
      }
    });

    this.errorActionsSub = this.errorActions$.subscribe((errorAction) => {
      if (errorAction !== null) {
        this.openSnackBar('Error on updating alarm!', 'Error!', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    });

    this.successSub = this.success$.subscribe((success) => {
      success && this.putInitMode();
    });

    this.getAlarms();
  }

  openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
    this._snackBar.open(message, action, config);
  }

  putInitMode(): void {
    this.store.dispatch(
      UserProfileAlertsActions.initEditMode({ actionSuccess: false })
    );
  }

  getAlarms(): void {
    this.store.dispatch(UserProfileAlertsActions.GetUserAlertsAPI$());
    this.store.dispatch(UserProfileAlertsActions.getUserAlertCompletedAPI$());
  }

  onHandlerChange(data: any): void {
    if (data) {
      this.store.dispatch(
        UserProfileAlertsActions.putUserAlertToCloseAPI$({
          id: data.id,
        })
      );
    }
  }

  drop(event: CdkDragDrop<any[]>, colunaId: string): void {
    if (event.previousContainer === event.container) {
      this.moveItemWithinColumn(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      colunaId === COLUMNS.TODO
        ? this.store.dispatch(
            UserProfileAlertsActions.putUserAlertToReopenAPI$({
              id: event.previousContainer.data[event.previousIndex].task_id,
            })
          )
        : this.store.dispatch(
            UserProfileAlertsActions.putUserAlertToCloseAPI$({
              id: event.previousContainer.data[event.previousIndex].id,
            })
          );
    }
  }

  moveItemWithinColumn(
    columnData: any[],
    previousIndex: number,
    currentIndex: number
  ): void {
    moveItemInArray(columnData, previousIndex, currentIndex);
  }

  openDialog(action = ''): void {
    this.alertForm = action === OPERATION.EDIT ? this.alertForm : null;

    this.modalRef = this.modalService.open(this.modalTemplate, { size: 'lg' });
  }

  onHandlerSubmit(formSubmit: any): void {
    this.onHandlerCreateTaks(formSubmit);
  }

  onHandlerDelete(taskId: any): void {
    this.store.dispatch(
      UserProfileAlertsActions.deleteUserAlertAPI$({ id: taskId })
    );
  }

  onHandlerEdit(event: any): void {
    this.alertForm = { ...event };
    this.openDialog(OPERATION.EDIT);
  }

  onHandlerCreateTaks(data: any): void {
    const { event, body, id } = data;

    event === OPERATION.ADD
      ? this.store.dispatch(
          UserProfileAlertsActions.postUserAlertAPI$({ body })
        )
      : this.store.dispatch(
          UserProfileAlertsActions.UpdateUserAlertAPI$({ body, id })
        );
  }

  onHandlerUndo(event: any): void {
    this.store.dispatch(
      UserProfileAlertsActions.putUserAlertToReopenAPI$({
        id: event.task_id,
      })
    );
  }
  ngOnDestroy(): void {
    this.successSub.unsubscribe();
    this.successActionSub.unsubscribe();
    this.selectUserListOfAlertSub.unsubscribe();
  }
}

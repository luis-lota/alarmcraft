import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Actions, createEffect, ofType } from '@ngrx/effects';


import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AlertsService } from '../../../services/alerts.service';

import { UserAlertsState } from './user-alerts.reducer';

import { UserProfileAlertsActions } from '../../actions';

@Injectable()
export class AlertFeatureEffects {
  getUserAlerts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileAlertsActions.GetUserAlertsAPI$),
      tap(() => {
        this.store.dispatch(
          UserProfileAlertsActions.putUserAlertsLoading({ loading: true })
        );
      }),

      switchMap(() => {
        return this.AlertsService.getAlerts().pipe(
          map((response) => {
            return {
              type: UserProfileAlertsActions.PutUserAlertsSuccess.type,
              results: response.items,
            };
          }),
          catchError((error: any) => {
            return of({
              type: UserProfileAlertsActions.PutUserAlertsError.type,
              error,
            });
          })
        );
      })
    )
  );

  getUserAlertsCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileAlertsActions.getUserAlertCompletedAPI$),
      tap(() => {
        this.store.dispatch(
          UserProfileAlertsActions.putUserAlertCompletedLoading({
            loadingCompletedTasks: true,
          })
        );
      }),

      switchMap(() => {
        return this.AlertsService.getCompleteTaks().pipe(
          map((response) => {
            return {
              type: UserProfileAlertsActions.putUserAlertCompletedSuccess.type,
              completedTasks: response.items,
            };
          }),
          catchError((error) => {
            return of({
              type: UserProfileAlertsActions.putUserAlertCompletedError.type,
              errorCompletedList: error,
            });
          })
        );
      })
    )
  );

  postUserAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileAlertsActions.postUserAlertAPI$),
      tap(() => {
        this.store.dispatch(
          UserProfileAlertsActions.putUserAlertsLoading({
            loading: true,
            success: false,
          })
        );
      }),

      switchMap((payload) => {
        return this.AlertsService.postTask(payload.body).pipe(
          map(() => {
            return {
              type: UserProfileAlertsActions.PutUserCriationAlertsSuccess.type,
            };
          }),
          catchError((error) => {
            return of({
              type: UserProfileAlertsActions.PutUserCriationAlertsError.type,
              error,
            });
          })
        );
      })
    )
  );

  deleteUserAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileAlertsActions.deleteUserAlertAPI$),
      tap(() => {
        this.store.dispatch(
          UserProfileAlertsActions.putUserAlertsLoading({
            loading: true,
            success: false,
          })
        );
      }),

      switchMap((payload) => {
        return this.AlertsService.deleteTask(payload.id).pipe(
          map(() => {
            return {
              type: UserProfileAlertsActions.PutUserDeleteAlertsSuccess.type,
            };
          }),
          catchError((error) => {
            return of({
              type: UserProfileAlertsActions.PutUserDeleteAlertsError.type,
              error,
            });
          })
        );
      })
    )
  );

  putUserAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileAlertsActions.UpdateUserAlertAPI$),
      tap(() => {
        this.store.dispatch(
          UserProfileAlertsActions.putUserAlertsLoading({
            loading: true,
            success: false,
          })
        );
      }),

      switchMap((payload) => {
        return this.AlertsService.putTasks(payload.body, payload.id).pipe(
          map(() => {
            return {
              type: UserProfileAlertsActions.UpdateUserAlertSuccess.type,
            };
          }),
          catchError((error) => {
            return of({
              type: UserProfileAlertsActions.UpdateUserAlertError.type,
              error,
            });
          })
        );
      })
    )
  );

  putUserAlertClosed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileAlertsActions.putUserAlertToCloseAPI$),
      tap(() => {
        this.store.dispatch(
          UserProfileAlertsActions.putUserAlertCompletedLoading({
            loadingCompletedTasks: true,
            successCompletedTasks: false,
          })
        );
      }),

      switchMap((payload) => {
        return this.AlertsService.putTaskToClose(payload.id).pipe(
          map(() => {
            return {
              type: UserProfileAlertsActions.putUserAlertToCloseSuccess.type,
            };
          }),
          catchError((error) => {
            return of({
              type: UserProfileAlertsActions.putUserAlertToCloseError.type,
              error,
            });
          })
        );
      })
    )
  );

  putUserAlertReopen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfileAlertsActions.putUserAlertToReopenAPI$),
      tap(() => {
        this.store.dispatch(
          UserProfileAlertsActions.putUserAlertCompletedLoading({
            loadingCompletedTasks: true,
            successCompletedTasks: false,
          })
        );
      }),

      switchMap((payload) => {
        return this.AlertsService.putTaskReopen(payload.id).pipe(
          map(() => {
            return {
              type: UserProfileAlertsActions.putUserAlertToReopenSuccess.type,
            };
          }),
          catchError((error) => {
            return of({
              type: UserProfileAlertsActions.putUserAlertToReopenError.type,
              error,
            });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private AlertsService: AlertsService,
    private store: Store<UserAlertsState>
  ) {}
}

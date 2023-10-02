import { createAction, props } from '@ngrx/store';

import { Alerts } from 'src/app/shared/models/alerts';

export const initUserAlerts = createAction('[ALERTS] initUserAlerts');

export const GetUserAlertsAPI$ = createAction('[ALERTS] GetUserAlertsAPI$');

export const putUserAlertsLoading = createAction(
  '[ALERTS] putUserAlertsLoading',
  props<{ loading: boolean; success?: boolean }>()
);

export const PutUserAlertsError = createAction(
  '[ALERTS] PutUserAlertsError',
  props<{ error: any }>()
);

export const PutUserAlertsSuccess = createAction(
  '[ALERTS] PutUserAlertsSuccess',
  props<{ results: Array<Alerts> }>()
);

export const postUserAlertAPI$ = createAction(
  '[ALERTS] postUserAlertAPI',
  props<{ body: Alerts }>()
);
export const PutUserCriationAlertsSuccess = createAction(
  '[ALERTS] PutUserCriationAlertsSuccess'
);

export const PutUserCriationAlertsError = createAction(
  '[ALERTS] PutUserCriationAlertsError',
  props<{ error: any }>()
);

export const deleteUserAlertAPI$ = createAction(
  '[ALERTS] deleteUserAlertAPI',
  props<{ id: string }>()
);

export const PutUserDeleteAlertsSuccess = createAction(
  '[ALERTS] PutUserDeleteAlertsSuccess'
);

export const PutUserDeleteAlertsError = createAction(
  '[ALERTS] PutUserDeleteAlertsError',
  props<{ error: any }>()
);

export const UpdateUserAlertAPI$ = createAction(
  '[ALERTS] UpdateUserAlertAPI',
  props<{ body: Alerts; id: string }>()
);

export const UpdateUserAlertSuccess = createAction(
  '[ALERTS] UpdateUserAlertSuccess'
);

export const UpdateUserAlertError = createAction(
  '[ALERTS] UpdateUserAlertError',
  props<{ error: any }>()
);

export const getUserAlertCompletedAPI$ = createAction(
  '[ALERTS] getUserAlertCompletedAPI$'
);

export const putUserAlertCompletedLoading = createAction(
  '[ALERTS] putUserAlertCompletedLoading',
  props<{ loadingCompletedTasks: boolean; successCompletedTasks?: boolean }>()
);

export const putUserAlertCompletedSuccess = createAction(
  '[ALERTS] putUserAlertCompletedSuccess',
  props<{ completedTasks: Array<Alerts> }>()
);

export const putUserAlertCompletedError = createAction(
  '[ALERTS] putUserAlertCompletedError',
  props<{ errorCompletedList: any }>()
);

export const putUserAlertToCloseAPI$ = createAction(
  '[ALERTS] putUserAlertToCloseAPI',
  props<{ id: string }>()
);

export const putUserAlertToCloseSuccess = createAction(
  '[ALERTS] putUserAlertToCloseSuccess'
);

export const putUserAlertToCloseError = createAction(
  '[ALERTS] putUserAlertToCloseError',
  props<{ error: any }>()
);

export const putUserAlertToReopenAPI$ = createAction(
  '[ALERTS] putUserAlertToReopenAPI',
  props<{ id: string }>()
);

export const putUserAlertToReopenSuccess = createAction(
  '[ALERTS] putUserAlertToReopenSuccess'
);

export const putUserAlertToReopenError = createAction(
  '[ALERTS] putUserAlertToReopenError',
  props<{ error: any }>()
);

export const initEditMode = createAction(
  '[ALERTS] initEditMode',
  props<{ actionSuccess: boolean }>()
);

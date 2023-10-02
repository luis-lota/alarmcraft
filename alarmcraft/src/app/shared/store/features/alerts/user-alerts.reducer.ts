import { Action, createReducer, on } from '@ngrx/store';

import { UserProfileAlertsActions } from '../../actions';

import { Alerts } from 'src/app/shared/models/alerts';

export const featureKey = 'User-alerts';

export interface UserAlertsState {
  loading: boolean;
  error: any;
  results: Array<Alerts>;
  sucess: boolean;
  actionSuccess: boolean;
  completedTasks:Array<Alerts>;
  errorCompletedList: any;
  loadingCompletedTasks: boolean;
}

export const initialState: UserAlertsState = {
  loading: false,
  error: null,
  results: [],
  sucess: false,
  actionSuccess: false,

  completedTasks: [],
  errorCompletedList: null,
  loadingCompletedTasks: false,
};

const initReducer = createReducer(
  initialState,
  on(UserProfileAlertsActions.initUserAlerts, () => initialState),

  on(UserProfileAlertsActions.putUserAlertsLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),

  on(UserProfileAlertsActions.PutUserAlertsSuccess, (state, { results }) => ({
    ...state,
    results,
    loading: false,
    error: null,
    sucess: true,
    actionSuccess: false,
  })),

  on(UserProfileAlertsActions.PutUserAlertsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserProfileAlertsActions.PutUserDeleteAlertsSuccess, (state) => ({
    ...state,
    actionSuccess: true,
    loading: false,
  })),

  on(UserProfileAlertsActions.PutUserDeleteAlertsError, (state, { error }) => ({
    ...state,
    actionSuccess: false,
    error,
    loading: false,
  })),


  on(UserProfileAlertsActions.PutUserCriationAlertsSuccess, (state) => ({
    ...state,
    actionSuccess: true,
  })),

  on(
    UserProfileAlertsActions.PutUserCriationAlertsError,
    (state, { error }) => ({
      ...state,
      actionSuccess: false,
      error,
      loading: false,
    })
  ),


  on(UserProfileAlertsActions.UpdateUserAlertError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    loadingCompletedTasks: false,
    actionSuccess: false,
  })),

  on(UserProfileAlertsActions.UpdateUserAlertSuccess, (state) => ({
    ...state,
    actionSuccess: true,
    loading: false,
  })),


  on(
    UserProfileAlertsActions.putUserAlertCompletedLoading,
    (state, { loadingCompletedTasks }) => ({
      ...state,
      loadingCompletedTasks,
    })
  ),

  on(
    UserProfileAlertsActions.putUserAlertCompletedSuccess,
    (state, { completedTasks }) => ({
      ...state,
      completedTasks,
      loadingCompletedTasks: false,
    })
  ),

  on(
    UserProfileAlertsActions.putUserAlertCompletedError,
    (state, { errorCompletedList }) => ({
      ...state,
      errorCompletedList,
      loadingCompletedTasks: false,
    })
  ),

  on(UserProfileAlertsActions.putUserAlertToCloseSuccess, (state) => ({
    ...state,
    actionSuccess: true,
    loading: false,
    loadingCompletedTasks: false,
  })),

  on(UserProfileAlertsActions.putUserAlertToCloseError, (state, { error }) => ({
    ...state,
    actionSuccess: false,
    error,
    loading: false,
    loadingCompletedTasks: false,
  })),

  on(UserProfileAlertsActions.putUserAlertToReopenSuccess, (state) => ({
    ...state,
    actionSuccess: true,
    loading: false,
    loadingCompletedTasks: false,
  })),

  on(
    UserProfileAlertsActions.putUserAlertToReopenError,
    (state, { error }) => ({
      ...state,
      actionSuccess: false,
      error,
      loading: false,
      loadingCompletedTasks: false,
    })
  ),

  on(UserProfileAlertsActions.initEditMode, (state, { actionSuccess }) => ({
    ...state,
    actionSuccess,
    sucess: false,
  }))
);

export function reducer(
  alertsState: UserAlertsState = initialState,
  action: Action
) {
  return initReducer(alertsState, action);
}

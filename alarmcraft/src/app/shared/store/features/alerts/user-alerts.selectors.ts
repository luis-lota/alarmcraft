import { createSelector } from '@ngrx/store';

import { UserAlertsState, featureKey } from './user-alerts.reducer';

import { AppState } from '../../reducers';

import { Alerts } from 'src/app/shared/models/alerts';

export const selectSharedState = (state: any) => state['shared'];

export const selectUserAlertsState = createSelector(
  selectSharedState,
  (state: AppState) => state[featureKey]
);

export const selectUseralertsResults = createSelector(
  selectUserAlertsState,
  (state: UserAlertsState) => state.results
);

export const selectUseralertsLoading = createSelector(
  selectUserAlertsState,
  (state: UserAlertsState) => state.loading
);

export const selectUserAlertsCompletedLoading = createSelector(
  selectUserAlertsState,
  (state: UserAlertsState) => state.loadingCompletedTasks
);

export const selectUseralertsError = createSelector(
  selectUserAlertsState,
  (state: UserAlertsState) => state.error
);

export const selectUseralertsSuccess = createSelector(
  selectUserAlertsState,
  (state: UserAlertsState) => state.sucess
);

export const selectUseralertsActionSuccess = createSelector(
  selectUserAlertsState,
  (state: UserAlertsState) => state.actionSuccess
);

export const selectUserListOfAlert = createSelector(
  selectUserAlertsState,
  (state: UserAlertsState) => {
    const todoList = state.results ? state.results : [];

    const mergedTodoAndComplete = state.completedTasks.map((task: Alerts) => ({
      ...task,
      completed: true,
    }));

    return [...mergedTodoAndComplete, ...todoList];
  }
);
import { ActionReducerMap } from '@ngrx/store';

import * as fromUserAlerts from '../features/alerts/user-alerts.reducer';

export interface AppState {
  [fromUserAlerts.featureKey]: fromUserAlerts.UserAlertsState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromUserAlerts.featureKey]: fromUserAlerts.reducer
};

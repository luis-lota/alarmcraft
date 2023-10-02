import { ActionReducerMap } from '@ngrx/store';

import * as fromRootReducer from './root.reducer';

export interface AppState {
  [fromRootReducer.featureKey]: fromRootReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromRootReducer.featureKey]: fromRootReducer.reducer
};

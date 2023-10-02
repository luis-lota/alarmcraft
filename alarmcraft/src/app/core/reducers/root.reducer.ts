import { Action, createReducer } from '@ngrx/store';

export const featureKey = 'root';

export interface State {
    loading: boolean;
  }
  
  export const initialState: State = {
    loading: false,
  };

  export const RootReducer = createReducer(initialState);

export function reducer(state: State | undefined , action: Action) {
  return RootReducer(state, action);
}

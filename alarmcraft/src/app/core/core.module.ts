import { InjectionToken, NgModule, isDevMode } from '@angular/core';

import { CommonModule } from '@angular/common';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MetaReducer, StoreModule } from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

import { reducers } from './reducers';


export const ROOT_REDUCER = new InjectionToken<unknown>('Root Reducer', {
  factory: () => reducers,
});

export const metaReducers: MetaReducer[] = [storeFreeze];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(ROOT_REDUCER, {metaReducers}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

  ]
})
export class CoreModule { }

import { CommonModule } from '@angular/common';

import { InjectionToken, NgModule } from '@angular/core';

import { MetaReducer, StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';

import { storeFreeze } from 'ngrx-store-freeze';

import { reducers } from './store/reducers';

import { AlertFeatureEffects } from './store/effects';

export const SHARED_REDUCER = new InjectionToken<unknown>('Root Reducer', {
  factory: () => reducers,
});

export const metaReducers: MetaReducer[] = [storeFreeze];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('shared', SHARED_REDUCER),
    EffectsModule.forFeature([AlertFeatureEffects]),
  ],
})
export class SharedStoreModule {}

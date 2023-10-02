import { NgModule } from '@angular/core';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharedModule } from '../shared/shared.module';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [DashboardRoutingModule, SharedModule,CommonModule],

})
export class DashboardModule {}

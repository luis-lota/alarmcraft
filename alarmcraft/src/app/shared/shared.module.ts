import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatListModule } from '@angular/material/list';

import { MatToolbarModule } from '@angular/material/toolbar';

import { FooterComponent } from './components/footer/footer.component';

import { CardComponent } from './components/card/card.component';

import { SharedStoreModule } from './shared-store.module';

import { ModalAlertsComponent } from './components/modal-alerts/modal-alerts.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { SpinnerComponent } from './components/spinner/spinner.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    FooterComponent,
    CardComponent,
    ModalAlertsComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatListModule,
    MatToolbarModule,
    SharedStoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    DragDropModule,
    MatListModule,
    FooterComponent,
    CardComponent,
    FormsModule,
    SpinnerComponent,
    ModalAlertsComponent,
    MatSnackBarModule
  ],
})
export class SharedModule {}

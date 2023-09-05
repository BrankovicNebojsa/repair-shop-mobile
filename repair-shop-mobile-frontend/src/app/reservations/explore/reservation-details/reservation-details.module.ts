import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationDetailsPageRoutingModule } from './reservation-details-routing.module';

import { ReservationDetailsPage } from './reservation-details.page';
import { RouterModule } from '@angular/router';
import { ReservationModalComponent } from '../../reservation-modal/reservation-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationDetailsPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReservationDetailsPage,
        data: { shouldDetach: true },
      },
    ]),
  ],
  declarations: [ReservationDetailsPage, ReservationModalComponent]
})
export class ReservationDetailsPageModule {}

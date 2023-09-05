import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarDetailsPageRoutingModule } from './car-details-routing.module';

import { CarDetailsPage } from './car-details.page';
import { RouterModule } from '@angular/router';
import { CarModalComponent } from '../../car-modal/car-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarDetailsPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CarDetailsPage,
        data: { shouldDetach: true },
      },
    ]),
  ],
  declarations: [CarDetailsPage, CarModalComponent]
})
export class CarDetailsPageModule {}

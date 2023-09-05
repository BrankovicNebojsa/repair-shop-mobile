import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceDetailsPageRoutingModule } from './service-details-routing.module';

import { ServiceDetailsPage } from './service-details.page';
import { RouterModule } from '@angular/router';
import { ServiceModalComponent } from '../../service-modal/service-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceDetailsPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ServiceDetailsPage,
        data: { shouldDetach: true },
      },
    ]),
  ],
  declarations: [ServiceDetailsPage, ServiceModalComponent]
})
export class ServiceDetailsPageModule {}

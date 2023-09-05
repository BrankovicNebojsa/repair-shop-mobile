import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelDetailsPageRoutingModule } from './model-details-routing.module';

import { ModelDetailsPage } from './model-details.page';
import { RouterModule } from '@angular/router';
import { ModelModalComponent } from '../../model-modal/model-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelDetailsPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ModelDetailsPage,
        data: { shouldDetach: true },
      },
    ]),
  ],
  declarations: [ModelDetailsPage, ModelModalComponent]
})
export class ModelDetailsPageModule {}

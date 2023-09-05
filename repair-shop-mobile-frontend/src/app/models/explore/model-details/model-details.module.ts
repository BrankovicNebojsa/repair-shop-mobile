import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelDetailsPageRoutingModule } from './model-details-routing.module';

import { ModelDetailsPage } from './model-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelDetailsPageRoutingModule
  ],
  declarations: [ModelDetailsPage]
})
export class ModelDetailsPageModule {}

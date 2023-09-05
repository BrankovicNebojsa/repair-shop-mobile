import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EngineDetailsPageRoutingModule } from './engine-details-routing.module';

import { EngineDetailsPage } from './engine-details.page';
import { RouterModule } from '@angular/router';
import { EngineModalComponent } from '../../engine-modal/engine-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EngineDetailsPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EngineDetailsPage,
        data: { shouldDetach: true },
      },
    ]),
  ],
  declarations: [EngineDetailsPage, EngineModalComponent],
})
export class EngineDetailsPageModule {}

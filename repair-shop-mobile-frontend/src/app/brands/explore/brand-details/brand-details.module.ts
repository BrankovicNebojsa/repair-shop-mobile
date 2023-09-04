import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandDetailsPageRoutingModule } from './brand-details-routing.module';

import { BrandDetailsPage } from './brand-details.page';
import { RouterModule } from '@angular/router';
import { BrandModalComponent } from '../../brand-modal/brand-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrandDetailsPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BrandDetailsPage,
        data: { shouldDetach: true },
      },
    ]),
  ],
  declarations: [BrandDetailsPage, BrandModalComponent],
})
export class BrandDetailsPageModule {}

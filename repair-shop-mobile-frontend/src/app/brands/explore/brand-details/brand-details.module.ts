import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandDetailsPageRoutingModule } from './brand-details-routing.module';

import { BrandDetailsPage } from './brand-details.page';
import { ExplorePage } from '../explore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrandDetailsPageRoutingModule
  ],
  declarations: [BrandDetailsPage]
})
export class BrandDetailsPageModule {}

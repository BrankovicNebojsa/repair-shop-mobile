import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelDetailsPage } from './model-details.page';

const routes: Routes = [
  {
    path: '',
    component: ModelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelDetailsPageRoutingModule {}

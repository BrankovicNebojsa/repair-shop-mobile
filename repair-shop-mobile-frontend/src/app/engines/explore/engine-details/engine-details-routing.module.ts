import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EngineDetailsPage } from './engine-details.page';

const routes: Routes = [
  {
    path: '',
    component: EngineDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngineDetailsPageRoutingModule {}

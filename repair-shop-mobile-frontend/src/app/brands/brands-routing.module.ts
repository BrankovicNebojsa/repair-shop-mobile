import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandsPage } from './brands.page';

const routes: Routes = [
  {
    path: '',
    component: BrandsPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./delete/delete.module').then( m => m.DeletePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandsPageRoutingModule {}

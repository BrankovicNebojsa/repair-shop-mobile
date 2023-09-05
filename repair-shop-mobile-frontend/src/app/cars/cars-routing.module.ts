import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarsPage } from './cars.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CarsPage,
    children: [
      {
        path: 'add',
        loadChildren: () =>
          import('./add/add.module').then((m) => m.AddPageModule),
      },
      {
        path: 'explore',
        loadChildren: () =>
          import('./explore/explore.module').then((m) => m.ExplorePageModule),
      },
      {
        path: '',
        redirectTo: '/cars/tabs/explore',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/cars/tabs/explore',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsPageRoutingModule {}

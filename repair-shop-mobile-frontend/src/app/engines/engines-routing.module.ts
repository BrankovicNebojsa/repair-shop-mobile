import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnginesPage } from './engines.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: EnginesPage,
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
        redirectTo: '/engines/tabs/explore',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/engines/tabs/explore',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnginesPageRoutingModule {}

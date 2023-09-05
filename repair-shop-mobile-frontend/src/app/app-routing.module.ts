import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'brands',
    pathMatch: 'full'
  },
  {
    path: 'brands',
    loadChildren: () => import('./brands/brands.module').then( m => m.BrandsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'prices',
    loadChildren: () => import('./prices/prices.module').then( m => m.PricesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'models',
    loadChildren: () => import('./models/models.module').then( m => m.ModelsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then( m => m.CarsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'engines',
    loadChildren: () => import('./engines/engines.module').then( m => m.EnginesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'reservations',
    loadChildren: () => import('./reservations/reservations.module').then( m => m.ReservationsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

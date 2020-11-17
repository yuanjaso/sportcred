import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { all_routes } from '../global/routing-statics';
import { AuthGuardService } from './auth/auth-guard.service';
const routes: Routes = [
  {
    // default is to go to login
    path: all_routes.login.url,
    loadChildren: () =>
      import('./login/login-routing.module').then((m) => m.LoginRoutingModule),
  },
  {
    path: all_routes.zone.url,
    loadChildren: () =>
      import('./zone/zone-routing.module').then((m) => m.ZoneRoutingModule),
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    redirectTo: all_routes.zone.url,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: all_routes.zone.url },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // { enableTracing: true } // route debugging purposes
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { all_routes } from '../global/routing-statics';
import { AuthGuardService } from './auth/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: all_routes.zone.url,
    pathMatch: 'full',
  },
  {
    //default is to go to login
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
    path: all_routes.trivia.url,
    loadChildren: () =>
      import('./trivia/trivia-routing.module').then(
        (m) => m.TriviaRoutingModule
      ),
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: all_routes.zone.url },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

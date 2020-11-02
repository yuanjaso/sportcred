import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { all_routes } from '../../global/routing-statics';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ZoneComponent } from './zone.component';

const routes: Routes = [
  {
    path: '',
    component: ZoneComponent,
    children: [
      {
        path: all_routes.admin.url,
        loadChildren: () =>
          import('./subpages/admin/admin-routing.module').then(
            (m) => m.AdminRoutingModule
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: all_routes.profile.url,
        loadChildren: () =>
          import('./subpages/profile/profile-routing.module').then(
            (m) => m.ProfileRoutingModule
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: all_routes.trivia.url,
        loadChildren: () =>
          import('./subpages/trivia/trivia-routing.module').then(
            (m) => m.TriviaRoutingModule
          ),
        canActivate: [AuthGuardService],
      },
      //todo add picks in here] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoneRoutingModule {}

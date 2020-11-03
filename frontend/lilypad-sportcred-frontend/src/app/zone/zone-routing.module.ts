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
        path: '',
        redirectTo: all_routes.zonehome.url,
        pathMatch: 'full',
      },
      {
        path: all_routes.zonehome.url,
        loadChildren: () =>
          import('./zone-home/zone-home-routing.module').then(
            (m) => m.ZoneHomeRoutingModule
          ),
        canActivate: [AuthGuardService],
      },
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
      //todo add picks in here] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoneRoutingModule {}

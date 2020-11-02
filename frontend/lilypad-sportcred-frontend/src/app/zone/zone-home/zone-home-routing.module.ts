import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { all_routes } from '../../../global/routing-statics';
import { AuthGuardService } from '../../auth/auth-guard.service';
import { ZoneHomeComponent } from './zone-home.component';

const routes: Routes = [
  {
    path: '',
    component: ZoneHomeComponent,
    children: [
      {
        path: all_routes.trivia.url,
        loadChildren: () =>
          import('./subpages/trivia/trivia-routing.module').then(
            (m) => m.TriviaRoutingModule
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: all_routes.predictions.url,
        loadChildren: () =>
          import('./subpages/picks/picks-routing.module').then(
            (m) => m.PicksRoutingModule
          ),
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoneHomeRoutingModule {}

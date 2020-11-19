import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { all_routes } from '../../../../../global/routing-statics';
import { SingleTriviaComponent } from './single-trivia/single-trivia.component';
import { TriviaComponent } from './trivia.component';

const routes: Routes = [
  { path: '', component: TriviaComponent },
  { path: all_routes.single_trivia.url, component: SingleTriviaComponent },
  // ! change this component
  { path: all_routes.multiplayertrivia.url, component: SingleTriviaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriviaRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriviaComponent } from './trivia.component';

const routes: Routes = [{ path: '', component: TriviaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriviaRoutingModule {}

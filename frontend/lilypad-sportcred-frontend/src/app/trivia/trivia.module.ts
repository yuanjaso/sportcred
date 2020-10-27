import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TriviaEffects } from './store/trivia.effects';
import { triviaFeatureKey, triviaReducer } from './store/trivia.reducer';
import { TriviaRoutingModule } from './trivia-routing.module';
import { TriviaComponent } from './trivia.component';
import { TriviaService } from './trivia.service';

@NgModule({
  declarations: [TriviaComponent],
  imports: [
    StoreModule.forFeature(triviaFeatureKey, triviaReducer),
    EffectsModule.forFeature([TriviaEffects]),
    CommonModule,
    TriviaRoutingModule,
  ],
  providers: [TriviaService],
})
export class TriviaModule {}

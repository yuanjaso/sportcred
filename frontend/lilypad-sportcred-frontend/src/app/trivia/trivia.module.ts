import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TriviaEffects } from './store/effects';
import { triviaFeatureKey, triviaReducer } from './store/reducer';
import { TriviaRoutingModule } from './trivia-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TriviaRoutingModule,
    StoreModule.forFeature(triviaFeatureKey, triviaReducer),
    EffectsModule.forFeature([TriviaEffects]),
  ],
})
export class TriviaModule {}

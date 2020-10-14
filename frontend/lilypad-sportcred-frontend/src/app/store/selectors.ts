import { createFeatureSelector } from '@ngrx/store';
import { triviaFeatureKey, TriviaState } from '../trivia/store/reducer';
import { AppState } from './reducer';

export const selectFeatureTrivia = createFeatureSelector<AppState, TriviaState>(
  triviaFeatureKey
);

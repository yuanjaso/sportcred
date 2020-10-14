import { createFeatureSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../auth/store/reducers';
import { triviaFeatureKey, TriviaState } from '../trivia/store/reducer';
import { AppState } from './reducer';

export const selectFeatureTrivia = createFeatureSelector<AppState, TriviaState>(
  triviaFeatureKey
);

export const selectFeatureAuth = createFeatureSelector<AppState, AuthState>(
  authFeatureKey
);

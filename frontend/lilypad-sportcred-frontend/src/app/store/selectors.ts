import { createFeatureSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../auth/store/reducers';
import { loginFeatureKey, LoginState } from '../login/store/reducers';
import {
  profileFeatureKey,
  ProfileState
} from '../profile/store/profile.reducer';
import { triviaFeatureKey, TriviaState } from '../trivia/store/trivia.reducer';
import { zoneFeatureKey, ZoneState } from '../zone/store/reducers';
import { AppState } from './reducer';


export const selectFeatureTrivia = createFeatureSelector<AppState, TriviaState>(
  triviaFeatureKey
);

export const selectFeatureAuth = createFeatureSelector<AppState, AuthState>(
  authFeatureKey
);

export const selectFeatureLogin = createFeatureSelector<AppState, LoginState>(
  loginFeatureKey
);

export const selectFeatureProfile = createFeatureSelector<
  AppState,
  ProfileState
>(profileFeatureKey);

export const selectFeatureZone = createFeatureSelector<AppState, ZoneState>(
  zoneFeatureKey
);

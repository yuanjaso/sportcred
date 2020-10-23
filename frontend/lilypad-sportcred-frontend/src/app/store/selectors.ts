import { createFeatureSelector } from '@ngrx/store';
import { AppState } from './reducer';

import { authFeatureKey, AuthState } from '../auth/store/reducers';
import { loginFeatureKey, LoginState } from '../login/store/reducers';
import {
  profileFeatureKey,
  ProfileState,
} from '../profile/store/profile.reducer';
import { ZoneState, zoneFeatureKey } from '../zone/store/reducers';
import { triviaFeatureKey, TriviaState } from '../trivia/store/reducer';

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

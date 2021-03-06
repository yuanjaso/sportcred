import { createFeatureSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../auth/store/reducers';
import { loginFeatureKey, LoginState } from '../login/store/reducers';
import { zoneFeatureKey, ZoneState } from '../zone/store/reducers';
import {
  profileFeatureKey,
  ProfileState,
} from '../zone/subpages/profile/store/profile.reducer';
import {
  debateFeatureKey,
  DebateState,
} from '../zone/zone-home/subpages/debate/store/debate.reducer';
import {
  picksFeatureKey,
  PicksState,
} from '../zone/zone-home/subpages/picks/store/picks.reducer';
import {
  triviaFeatureKey,
  TriviaState,
} from '../zone/zone-home/subpages/trivia/store/trivia.reducer';
import { AppState } from './reducer';

export const selectFeaturePicks = createFeatureSelector<AppState, PicksState>(
  picksFeatureKey
);

export const selectFeatureTrivia = createFeatureSelector<AppState, TriviaState>(
  triviaFeatureKey
);

export const selectFeatureDebate = createFeatureSelector<AppState, DebateState>(
  debateFeatureKey
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

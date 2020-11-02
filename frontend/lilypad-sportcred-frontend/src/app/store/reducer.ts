import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/store/reducers';
import { loginReducer, LoginState } from '../login/store/reducers';
import { zoneReducer, ZoneState } from '../zone/store/reducers';
import {
  profileReducer,
  ProfileState,
} from '../zone/subpages/profile/store/profile.reducer';
import {
  triviaReducer,
  TriviaState,
} from '../zone/subpages/trivia/store/reducer';

export interface AppState {
  trivia: TriviaState;
  auth: AuthState;
  login: LoginState;
  profile: ProfileState;
  zone: ZoneState;
}

export const appReducers: ActionReducerMap<AppState> = {
  trivia: triviaReducer,
  auth: authReducer,
  login: loginReducer,
  profile: profileReducer,
  zone: zoneReducer,
};

import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/store/reducers';
import { loginReducer, LoginState } from '../login/store/reducers';
import { zoneReducer, ZoneState } from '../zone/store/reducers';
import {
  profileReducer,
  ProfileState,
} from '../zone/subpages/profile/store/profile.reducer';
import {
  debateReducer,
  DebateState,
} from '../zone/zone-home/subpages/debate/store/debate.reducer';
import {
  triviaReducer,
  TriviaState,
} from '../zone/zone-home/subpages/trivia/store/trivia.reducer';

export interface AppState {
  trivia: TriviaState;
  debate: DebateState;
  auth: AuthState;
  login: LoginState;
  profile: ProfileState;
  zone: ZoneState;
}

export const appReducers: ActionReducerMap<AppState> = {
  trivia: triviaReducer,
  debate: debateReducer,
  auth: authReducer,
  login: loginReducer,
  profile: profileReducer,
  zone: zoneReducer,
};

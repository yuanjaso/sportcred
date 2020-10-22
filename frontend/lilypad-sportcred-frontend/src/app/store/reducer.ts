import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/store/reducers';
import { triviaReducer, TriviaState } from '../trivia/store/reducer';
import { loginReducer, LoginState } from '../login/store/reducers';
import { ProfileState, profileReducer } from '../profile/store/profile.reducer';

export interface AppState {
  trivia: TriviaState;
  auth: AuthState;
  login: LoginState;
  profile: ProfileState;
}

export const appReducers: ActionReducerMap<AppState> = {
  trivia: triviaReducer,
  auth: authReducer,
  login: loginReducer,
  profile: profileReducer,
};

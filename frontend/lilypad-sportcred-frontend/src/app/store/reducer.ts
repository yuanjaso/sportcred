import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/store/reducers';
import { triviaReducer, TriviaState } from '../trivia/store/reducer';
import { loginReducer, LoginState } from '../login/store/reducers';
export interface AppState {
  trivia: TriviaState;
  auth: AuthState;
  login: LoginState;
}

export const appReducers: ActionReducerMap<AppState> = {
  trivia: triviaReducer,
  auth: authReducer,
  login: loginReducer,
};

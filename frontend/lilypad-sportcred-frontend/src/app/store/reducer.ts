import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/store/reducers';
import { triviaReducer, TriviaState } from '../trivia/store/reducer';

export interface AppState {
  trivia: TriviaState;
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  trivia: triviaReducer,
  auth: authReducer,
};

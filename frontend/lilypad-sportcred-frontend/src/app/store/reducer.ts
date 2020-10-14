import { ActionReducerMap } from '@ngrx/store';
import { triviaReducer, TriviaState } from '../trivia/store/reducer';

export interface AppState {
  trivia: TriviaState;
}

export const appReducers: ActionReducerMap<AppState> = {
  trivia: triviaReducer,
};

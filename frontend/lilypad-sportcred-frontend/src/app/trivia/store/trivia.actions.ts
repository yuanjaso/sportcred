import { createAction, props } from '@ngrx/store';
import { ACS } from '../../profile/profile.types';
import { TriviaInstance, TriviaResults } from '../trivia.types';

export const queryForTriviaGames = createAction(
  '[Trivia] Query For Trivia Games'
);
export const setAllTriviaInstances = createAction(
  '[Trivia] Set All Trivia Instances',
  props<{ allTriviaInstances: TriviaInstance[] }>()
);

// dispatch this action after the trivia instance is created for either single/multi player games
export const setTriviaInstance = createAction(
  '[Trivia] Set Trivia Instance',
  props<{ triviaInstance: TriviaInstance }>()
);

export const submitTriviaResults = createAction(
  '[Trivia] Submit Trivia Results',
  props<{ results: TriviaResults }>()
);
export const setUpdatedACS = createAction(
  '[Trivia] Set Updated ACS',
  props<{ acs: ACS }>()
);

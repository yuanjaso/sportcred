import { createAction, props } from '@ngrx/store';
import { PredictionResults } from '../picks.types';

// get the saved predictions for the given user
export const getPredictions = createAction(
  '[Picks] Get Predictions',
  props<{ year: number; user_id: number; }>()
);

// set the predictions into the store
export const setPredictions = createAction(
  '[Picks] Set Predictions',
  props<{ predictions: Predictions }>()
);

export const lockInResults = createAction(
  '[Picks] Lock In Results',
  props<{ results: PredictionResults }>()
);

import { createAction, props } from '@ngrx/store';
import { Predictions, UpdatePredictionPayload } from '../picks.types';

// get the saved predictions for the given user
export const getPredictions = createAction(
  '[Picks] Get Predictions',
  props<{ year: number; user_id: number }>()
);

// set the predictions into the store
export const setPredictions = createAction(
  '[Picks] Set Predictions',
  props<{ predictions: Predictions }>()
);

// save the user predictions onto the backend
export const updateUserPredictions = createAction(
  '[Picks] Update User Predictions',
  props<{ predictions: UpdatePredictionPayload }>()
);

// as an admin, set the outcome of the predictions
export const lockInResults = createAction(
  '[Picks] Lock In Results',
  props<{ results: UpdatePredictionPayload }>()
);

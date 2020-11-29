import { createAction, props } from '@ngrx/store';
import { PredictionResults } from '../picks.types';

export const lockInResults = createAction(
  '[Picks] Lock In Results',
  props<{ results: PredictionResults }>()
);

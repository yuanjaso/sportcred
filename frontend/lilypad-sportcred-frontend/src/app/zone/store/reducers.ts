import { Action, createReducer, on } from '@ngrx/store';
import * as types from '../zone.types';
import * as actions from './actions';

export interface ZoneState {
  allTeams: types.Team[];
  allplayers: types.Player[];
}
export const initialState: ZoneState = {
  allTeams: [],
  allplayers: [],
};

const reducer = createReducer<ZoneState>(
  initialState,
  on(actions.setAllSportsTeams, (state, { teams }) => {
    return { ...state, allTeams: teams };
  }),
  on(actions.setAllPlayers, (state, { players }) => {
    return { ...state, allplayers: players };
  })
);

export function zoneReducer(state: ZoneState, action: Action): ZoneState {
  return reducer(state, action);
}

export const zoneFeatureKey = 'zone';

import { Action, createReducer, on } from '@ngrx/store';
import * as types from '../zone.types';
import * as actions from './actions';

export interface ZoneState {
  allTeams: types.Team[];
  allPlayers: types.Player[];
  allSports: types.Sport[];
  rookies: types.Player[];
}
export const initialState: ZoneState = {
  allTeams: undefined,
  allPlayers: undefined,
  allSports: undefined,
  rookies: undefined,
};

const reducer = createReducer<ZoneState>(
  initialState,
  on(actions.setAllSportsTeams, (state, { teams }) => {
    return { ...state, allTeams: teams };
  }),
  on(actions.setAllPlayers, (state, { players }) => {
    return { ...state, allPlayers: players };
  }),
  on(actions.setAllSports, (state, { sports }) => {
    return { ...state, allSports: sports };
  }),
  on(actions.setRookies, (state, { rookies }) => {
    return { ...state, rookies };
  }),
  on(actions.clearAllZoneData, (state) => {
    return {
      ...state,
      allTeams: undefined,
      allplayers: undefined,
      allSports: undefined,
      rookies: undefined,
    };
  })
);

export function zoneReducer(state: ZoneState, action: Action): ZoneState {
  return reducer(state, action);
}

export const zoneFeatureKey = 'zone';

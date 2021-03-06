import { createAction, props } from '@ngrx/store';
import { Player, Sport, Team } from '../zone.types';

export const getAllSportsTeams = createAction('[Zone] Get All Sports Teams');
export const setAllSportsTeams = createAction(
  '[Zone] Set All Sports Teams',
  props<{ teams: Team[] }>()
);

export const getAllPlayers = createAction(
  '[Zone] Get All Players',
  props<{ rookies?: boolean }>()
);

export const setAllPlayers = createAction(
  '[Zone] Set All Players',
  props<{ players: Player[] }>()
);
export const setRookies = createAction(
  '[Zone] Set Rookies',
  props<{ rookies: Player[] }>()
);

export const getAllSports = createAction('[Zone] Get All Sports');

export const setAllSports = createAction(
  '[Zone] Set All Sports',
  props<{ sports: Sport[] }>()
);

export const clearAllZoneData = createAction(
  '[Zone] clear All Players And Teams'
);

export const searchForResults = createAction(
  '[Zone] Search For Results',
  props<{ search: string }>()
);

import { createAction, props } from '@ngrx/store';
import { Team, Player, Sport } from '../zone.types';

export const getAllSportsTeams = createAction('[Zone] Get All Sports Teams');
export const setAllSportsTeams = createAction(
  '[Zone] Set All Sports Teams',
  props<{ teams: Team[] }>()
);

export const getAllPlayers = createAction('[Zone] Get All Players');

export const setAllPlayers = createAction(
  '[Zone] Set All Players',
  props<{ players: Player[] }>()
);

export const getAllSports = createAction('[Zone] Get All Sports');

export const setAllSports = createAction(
  '[Zone] Set All Sports',
  props<{ sports: Sport[] }>()
);

export const clearAllPlayersAndTeams = createAction(
  '[Zone] clear All Players And Teams'
);

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { ZoneService } from '../zone.service';
import * as actions from './actions';
import { Team, Player } from '../zone.types';

@Injectable()
export class ZoneEffects {
  getAllSportsTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getAllSportsTeams),
      mergeMap(() =>
        this.zoneService.getAllTeams().pipe(
          first(),
          map((teams: Team[]) => {
            return {
              type: actions.setAllSportsTeams.type,
              teams,
            };
          }),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  getAllPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.setAllPlayers),
      mergeMap(() =>
        this.zoneService.getAllPlayers().pipe(
          first(),
          map((players: Player[]) => {
            return {
              type: actions.setAllPlayers.type,
              players,
            };
          }),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private zoneService: ZoneService) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {
  catchError,
  first,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ZoneService } from '../zone.service';
import { Player, Sport, Team } from '../zone.types';
import * as actions from './actions';

@Injectable()
export class ZoneEffects {
  searchForResults$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.searchForResults),
        switchMap(({ search }) => this.zoneService.searchForResults(search)),
        tap((results) => {
          this.zoneService.searchResults$.next(results);
        })
      ),
    { dispatch: false }
  );

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
      ofType(actions.getAllPlayers),
      mergeMap(({ rookies }) =>
        this.zoneService.getAllPlayers(rookies).pipe(
          first(),
          map((players: Player[]) => {
            return rookies
              ? actions.setRookies({ rookies: players })
              : actions.setAllPlayers({ players });
          }),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  getAllSports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getAllSports),
      mergeMap(() =>
        this.zoneService.getAllSports().pipe(
          first(),
          map((sports: Sport[]) => {
            return {
              type: actions.setAllSports.type,
              sports,
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

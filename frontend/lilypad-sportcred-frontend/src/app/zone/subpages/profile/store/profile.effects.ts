import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { selectUserInfo } from 'src/app/auth/store/selectors';
import { AppState } from 'src/app/store/reducer';
import { ProfileService } from '../profile.service';
import {
  addUserToRadarList,
  getACSHistory,
  getProfile,
  getRadarList,
  removeUserFromRadarList,
  updateProfile,
  updateProfilePicture,
} from './profile.actions';

@Injectable()
export class ProfileEffects {
  addUserToRadarList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addUserToRadarList),
        mergeMap(({ userId }) =>
          this.profileService.addUserToRadarList(userId)
        ),
        tap(() => this.profileService.refreshRadarList$.next())
      ),
    { dispatch: false }
  );

  removeUserFromRadarList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeUserFromRadarList),
        mergeMap(({ userId }) =>
          this.profileService.removeUserFromRadarList(userId)
        ),
        tap(() => this.profileService.refreshRadarList$.next())
      ),
    { dispatch: false }
  );

  getRadarList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getRadarList),
        switchMap(({ userId }) => this.profileService.getRadarList(userId)),
        tap((radarList) => this.profileService.radarList$.next(radarList))
      ),
    { dispatch: false }
  );

  getProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getProfile),
        switchMap((action) => this.profileService.getProfile(action.userId)),
        map((profile) => this.profileService.$hotProfile.next(profile))
      ),
    { dispatch: false }
  );
  getACSHistory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getACSHistory),
        switchMap((action) => this.profileService.getACSHistory(action.userId)),
        map((history) => this.profileService.$hotACSHistory.next(history))
      ),
    { dispatch: false }
  );
  updateProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProfile),
        switchMap((action) => this.profileService.updateProfile(action.profile))
      ),
    { dispatch: false }
  );
  updateProfilePicture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfilePicture),
      mergeMap((action) =>
        this.profileService.updateProfilePicture(action.picture).pipe(
          withLatestFrom(this.store.select(selectUserInfo)),
          map(
            ([_, user]) => ({
              type: getProfile.type,
              userId: user.user_id,
            }),
            catchError(() => EMPTY)
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store<AppState>
  ) {}
}

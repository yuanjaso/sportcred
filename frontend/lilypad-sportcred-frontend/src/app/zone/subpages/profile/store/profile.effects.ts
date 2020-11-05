import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { selectUserInfo } from '../../../../auth/store/selectors';
import { AppState } from '../../../../store/reducer';
import { ProfileService } from '../profile.service';
import {
  getACSHistory,
  getProfile,
  updateProfile,
  updateProfilePicture,
} from './profile.actions';
@Injectable()
export class ProfileEffects {
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

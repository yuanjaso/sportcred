import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ProfileService } from '../profile.service';
import { getACSHistory, getProfile, updateProfile } from './profile.actions';

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

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}

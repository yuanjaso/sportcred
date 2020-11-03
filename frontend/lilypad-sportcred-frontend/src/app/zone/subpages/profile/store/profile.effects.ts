import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs/operators';
import { ProfileService } from '../profile.service';
import { getProfile, updateProfile } from './profile.actions';

@Injectable()
export class ProfileEffects {
  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProfile),
      switchMap((action) => this.profileService.getProfile(action.userId)),
      mergeMap((profile) => {
        this.profileService.$hotProfile.next(profile);
        return [];
      })
    )
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

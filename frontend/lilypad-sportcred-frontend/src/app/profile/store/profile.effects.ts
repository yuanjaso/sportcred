import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ProfileService } from '../profile.service';
import { getProfile, setProfile } from './profile.actions';

@Injectable()
export class ProfileEffects {
  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProfile),
      switchMap((action) => this.profileService.getProfile(action.userId)),
      map((profile) => setProfile({ profile }))
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}

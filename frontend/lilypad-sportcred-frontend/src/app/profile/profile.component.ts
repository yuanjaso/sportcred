import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { all_routes } from '../../global/routing-statics';
import { AppState } from '../store/reducer';
import { Profile } from './profile.types';
import { getProfile, updateProfile } from './store/profile.actions';
import { selectProfile } from './store/profile.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: Profile;

  editStatusMode = false;
  editAboutMode = false;

  userId$: Observable<number>;

  followers = 59;
  following = 104;

  private subscription = new Subscription();

  constructor(private title: Title, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.title.setTitle(all_routes.profile.title);

    // ! hardcoded make dummy request to get user 1
    this.store.dispatch(getProfile({ userId: 2 }));

    this.subscription.add(
      this.store
        .select(selectProfile)
        .pipe(
          map((profile) => cloneDeep(profile)),
          tap((profile) => {
            this.profile = profile;
          })
        )
        .subscribe()
    );

    // ! utilize store selector instead
    this.userId$ = of(2);
  }

  beginEditStatus(): void {
    this.editStatusMode = true;
  }

  submitNewStatus(): void {
    this.editStatusMode = false;

    this.store.dispatch(
      updateProfile({ profile: { status: this.profile.status } })
    );
  }

  beginEditAbout(): void {
    this.editAboutMode = true;
  }

  submitNewAbout(): void {
    this.editAboutMode = false;

    this.store.dispatch(
      updateProfile({ profile: { about: this.profile.about } })
    );
  }
}

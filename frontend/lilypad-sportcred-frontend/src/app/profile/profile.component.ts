import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { all_routes } from '../../global/routing-statics';
import { AppState } from '../store/reducer';
import { Profile } from './profile.types';
import { getProfile } from './store/profile.actions';
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

  // true if the user is viewing their own profile, false otherwise
  isOwnProfile = true;

  followers = 59;
  following = 104;

  private subscription = new Subscription();

  constructor(private title: Title, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.title.setTitle(all_routes.profile.title);

    // make dummy request to get user 1
    this.store.dispatch(getProfile({ userId: 4 }));

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
  }

  beginEditStatus(): void {
    console.log('old status', this.profile.status);
    this.editStatusMode = true;
  }

  submitNewStatus(): void {
    console.log('new status', this.profile.status);
    this.editStatusMode = false;
  }

  beginEditAbout(): void {
    console.log('old about', this.profile.about);
    this.editAboutMode = true;
  }

  submitNewAbout(): void {
    console.log('new status', this.profile.about);
    this.editAboutMode = false;
  }
}

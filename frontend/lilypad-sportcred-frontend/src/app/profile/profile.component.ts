import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  private subscription = new Subscription();

  constructor(private title: Title, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.title.setTitle(all_routes.profile.title);

    // make dummy request to get user 1
    this.store.dispatch(getProfile({ userId: 4 }));

    this.subscription.add(
      this.store
        .select(selectProfile)
        .pipe(tap((profile) => (this.profile = profile)))
        .subscribe()
    );
  }
}

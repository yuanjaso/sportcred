import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, tap } from 'rxjs/operators';
import { all_routes } from '../../global/routing-statics';
import { selectUserInfo } from '../auth/store/selectors';
import { getProfile } from '../profile/store/profile.actions';
import { AppState } from '../store/reducer';
import { LiveDialogComponent } from './live-dialog/live-dialog.component';

interface Tab {
  icon: string;
  link: string;
}
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit {
  profileTab: Tab = { icon: 'person', link: all_routes.profile.url };
  zoneTab: Tab = { icon: 'home', link: all_routes.zone.url };

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  setCurrentTab() {
    switch (this.router.url) {
      case 'profile':
        // TODO: Add profile link to case
        return 0;
      default:
        return 1;
    }
  }

  onClickLive() {
    this.dialog.open(LiveDialogComponent);
  }

  onProfileClick(): void {
    // grab the user id from the store and make a HTTP request to get the profile for the current user
    this.store
      .select(selectUserInfo)
      .pipe(
        first(),
        map((user) => user.user_id),
        tap((userId) => this.store.dispatch(getProfile({ userId })))
      )
      .subscribe();
  }
}

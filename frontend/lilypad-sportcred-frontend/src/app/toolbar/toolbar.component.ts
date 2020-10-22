import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
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
  adminTab: Tab = { icon: 'admin_panel_settings', link: all_routes.admin.url };
  profileTab: Tab = { icon: 'person', link: all_routes.profile.url };
  zoneTab: Tab = { icon: 'home', link: all_routes.zone.url };

  isAdmin = false;
  userId: number;

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectUserInfo)
      .pipe(
        first(),
        tap((user) => {
          this.isAdmin = user.is_superuser;
          this.userId = user.user_id;
        })
      )
      .subscribe();
  }

  setCurrentTab() {
    switch (this.router.url) {
      case all_routes.admin.url:
        return 0;
      case all_routes.profile.url:
        return 1
      default:
        return 2;
    }
  }

  onClickLive() {
    this.dialog.open(LiveDialogComponent);
  }

  onProfileClick(): void {
    // grab the user id that came from the store and make a HTTP request to get the profile for the current user
    this.store.dispatch(getProfile({ userId: this.userId }));
  }
}

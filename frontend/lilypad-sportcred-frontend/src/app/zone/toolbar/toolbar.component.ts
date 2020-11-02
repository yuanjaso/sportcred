import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { all_routes } from '../../../global/routing-statics';
import { selectUserInfo } from '../../auth/store/selectors';
import { AppState } from '../../store/reducer';
import { getProfile } from '../subpages/profile/store/profile.actions';
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
  pages = [
    { icon: 'person', link: all_routes.profile.url },
    { icon: 'home', link: all_routes.zone.url },
  ];
  isAdmin = false;
  userId: number;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
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
          if (!this.isAdmin) {
            //if user is admin, lets append the admin button to the front
            this.pages.unshift({
              icon: 'admin_panel_settings',
              link: all_routes.admin.url,
            });
          }
        })
      )
      .subscribe();
  }

  onClickLive() {
    this.dialog.open(LiveDialogComponent);
  }

  navigate(e) {
    //todo i beleive this dispatch should be done in profile page instead (single resp principle)
    if (this.pages[e.index].link == all_routes.profile.url) {
      this.store.dispatch(getProfile({ userId: this.userId }));
    }
    this.router.navigate([this.pages[e.index].link], {
      relativeTo: this.route,
    });
  }
}

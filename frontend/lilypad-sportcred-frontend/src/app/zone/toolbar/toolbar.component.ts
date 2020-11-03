import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { all_routes } from '../../../global/routing-statics';
import { selectUserInfo } from '../../auth/store/selectors';
import { AppState } from '../../store/reducer';
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
    { icon: 'home', link: all_routes.zone.url },
    { icon: 'person', link: all_routes.profile.url },
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
            //todo unnegate
            //if user is admin, lets append the admin button to the front
            this.pages.push({
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
    if (e.index >= this.pages.length) return;
    this.router.navigate([this.pages[e.index]?.link], {
      relativeTo: this.route,
      queryParams: { userId: this.userId },
    });
  }
}

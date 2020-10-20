import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { all_routes } from '../../global/routing-statics';
import { MatDialog } from '@angular/material/dialog';
import { LiveDialogComponent } from './live-dialog/live-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {

  constructor(public router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  setPage(page: string) {
    switch(page) {
      case 'PROFILE':
        // TODO: Profile link here
        break;
      case 'ZONE':
        this.router.navigate([all_routes.zone.url]);
        break;
      case 'LIVE':
        // Popup dialog
        this.onClickLive();
        break;
    }
  }

  setCurrentTab() {
    switch(this.router.url) {
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
}

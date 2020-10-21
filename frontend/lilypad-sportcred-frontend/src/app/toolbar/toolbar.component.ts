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

  tabList: { icon: string, link: string }[] = [
    { icon: "person", link: all_routes.profile.url },
    { icon: "home", link: all_routes.zone.url }
  ]

  constructor(public router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
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

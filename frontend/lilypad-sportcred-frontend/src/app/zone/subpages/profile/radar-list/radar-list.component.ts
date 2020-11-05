import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RadarUser } from '../profile.types';

@Component({
  selector: 'app-radar-list',
  templateUrl: './radar-list.component.html',
  styleUrls: ['./radar-list.component.scss'],
})
export class RadarListComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { type: 'following' | 'followers'; list: RadarUser[] },
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  goToProfile(userId: number): void {
    // if radar list is opened we know the route will look like /zone/profile?userId=4, just need to change the query param
    this.router.navigate([], {
      queryParams: { userId },
      relativeTo: this.activatedRoute,
    });
  }
}

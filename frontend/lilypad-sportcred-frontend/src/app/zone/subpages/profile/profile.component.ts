import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Observable, of, Subscription } from 'rxjs';
import { filter, first, map, tap, withLatestFrom } from 'rxjs/operators';
import { all_routes } from '../../../../global/routing-statics';
import { selectUserInfo } from '../../../auth/store/selectors';
import { FormatedChartData } from '../../../shared-components/echarts/echart.types';
import { alignHistoryToFormat } from '../../../shared-components/echarts/echart.util';
import { AppState } from '../../../store/reducer';
import { ProfileService } from './profile.service';
import { Profile, RadarUser } from './profile.types';
import { RadarListComponent } from './radar-list/radar-list.component';
import {
  addUserToRadarList,
  getACSHistory,
  getProfile,
  getRadarList,
  removeUserFromRadarList,
  updateProfile
} from './store/profile.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() userId: number;

  profile: Profile;
  formattedACSHistory: FormatedChartData;
  editStatusMode = false;
  editAboutMode = false;

  acsScores: { name: string; score: number }[];

  userId$: Observable<number>;

  followers: number;
  following: number;

  sports: { id: number; name: string }[];
  favouriteSports: number[];

  followersList: RadarUser[];
  followingList: RadarUser[];

  showAddToRadarButton: boolean;

  private subscription = new Subscription();

  constructor(
    private matDialog: MatDialog,
    private title: Title,
    private store: Store<AppState>,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title.setTitle(all_routes.profile.title);

    this.userId$ = this.store.select(selectUserInfo).pipe(
      first(),
      map((user) => user.user_id)
    );

    const routeChanges$ = this.route.queryParams.pipe(
      map(({ userId }) => Number(userId)),
      tap((userId) => {
        this.store.dispatch(
          getProfile({
            userId,
          })
        );
        this.store.dispatch(
          getACSHistory({
            userId,
          })
        );
        this.refreshRadarList(userId);
      })
    );
    this.subscription.add(routeChanges$.subscribe());

    this.profileService.refreshRadarList$
      .pipe(
        withLatestFrom(routeChanges$),
        tap(([, userId]) => this.refreshRadarList(userId))
      )
      .subscribe();

    this.subscription.add(
      this.profileService.$hotProfile
        .pipe(
          filter((profile) => profile !== undefined),
          map((profile) => cloneDeep(profile)),
          tap((profile) => {
            this.profile = profile;
            this.acsScores = Object.keys(profile.ACS).map((key) => ({
              name: key,
              score: profile.ACS[key],
            }));
            this.favouriteSports = profile.favourite_sports.map((el) => el.id);
          })
        )
        .subscribe()
    );
    this.subscription.add(
      this.profileService.$hotACSHistory
        .pipe(
          filter((hist) => hist !== undefined),
          map((hist) => cloneDeep(hist)),
          map((hist) => alignHistoryToFormat(hist)),
          tap((hist: FormatedChartData) => {
            this.formattedACSHistory = hist;
          })
        )
        .subscribe()
    );

    // ! hardcoded
    of([
      { id: 1, name: 'Basketball' },
      { id: 2, name: 'Football' },
      { id: 3, name: 'Soccer' },
      { id: 10, name: 'Baseball' },
      { id: 56, name: 'Golf' },
    ])
      .pipe(tap((sports) => (this.sports = sports)))
      .subscribe();
  }

  refreshRadarList(userId: number): void {
    const radarList$ = this.profileService.radarList$.pipe(
      first(),
      withLatestFrom(this.userId$),
      tap(([radarList, currentUserId]) => {
        this.followers = radarList.followers.length;
        this.following = radarList.following.length;
        this.followersList = radarList.followers;
        this.followingList = radarList.following;

        // execute this logic if we are looking at a different person's profile
        if (radarList.id !== currentUserId) {
          // check if the followers list contains the logged in person's user id
          // if true then show the remove from radar button
          // if false then show the add to radar button
          this.showAddToRadarButton = !this.followersList.find(
            (el) => el.id === currentUserId
          );
        }
      })
    );
    radarList$.subscribe();
    this.store.dispatch(getRadarList({ userId }));
  }

  addToRadar(userId: number): void {
    this.store.dispatch(addUserToRadarList({ userId }));
  }

  removeFromRadar(userId: number): void {
    this.store.dispatch(removeUserFromRadarList({ userId }));
  }

  showRadarList(
    type: 'following' | 'followers',
    list: { id: number; username: string }[]
  ): void {
    this.matDialog.open(RadarListComponent, {
      width: '20rem',
      height: '30rem',
      maxWidth: '40vw',
      data: { type, list },
    });
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

  updateFavouriteSports(): void {
    // need to update the view too
    this.profile.favourite_sports = this.sports.filter(
      (sport) =>
        this.favouriteSports.find((id) => sport.id === id) !== undefined
    );
    this.store.dispatch(
      updateProfile({ profile: { favourite_sports: this.favouriteSports } })
    );
  }
}

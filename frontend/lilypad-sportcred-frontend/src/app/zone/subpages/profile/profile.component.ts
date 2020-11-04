import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Observable, of, Subscription } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { all_routes } from '../../../../global/routing-statics';
import { selectUserInfo } from '../../../auth/store/selectors';
import { FormatedChartData } from '../../../shared-components/echarts/echart.types';
import { alignHistoryToFormat } from '../../../shared-components/echarts/echart.util';
import { AppState } from '../../../store/reducer';
import { ProfileService } from './profile.service';
import { Profile } from './profile.types';
import {
  getACSHistory,
  getProfile,
  updateProfile,
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

  userId$: Observable<number>;

  // ! hardcoded
  followers = 59;
  following = 104;

  sports: { id: number; name: string }[];
  favouriteSports: number[];

  private subscription = new Subscription();

  constructor(
    private title: Title,
    private store: Store<AppState>,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title.setTitle(all_routes.profile.title);

    //allow the userId to come in from @Input() OR route navigate
    let trueId = this.userId ?? this.route.snapshot.queryParams.userId;
    this.store.dispatch(
      getProfile({
        userId: trueId,
      })
    );
    this.store.dispatch(
      getACSHistory({
        userId: trueId,
      })
    );

    this.subscription.add(
      this.profileService.$hotProfile
        .pipe(
          filter((profile) => profile !== undefined),
          map((profile) => cloneDeep(profile)),
          tap((profile) => {
            this.profile = profile;
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

    this.userId$ = this.store.select(selectUserInfo).pipe(
      first(),
      map((user) => user.user_id)
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

  uploadNewPhoto() {
    //todo implement
  }
}

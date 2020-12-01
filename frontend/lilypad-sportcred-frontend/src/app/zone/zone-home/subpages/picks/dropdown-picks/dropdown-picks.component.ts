import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../../../../../store/reducer';
import { getAllPlayers } from '../../../../store/actions';
import { selectPlayers } from '../../../../store/selectors';
import { Player } from '../../../../zone.types';
import {
  PredictionFeature,
  Predictions,
  UpdatePredictionPayload
} from '../picks.types';
import { lockInResults, updateUserPredictions } from '../store/picks.actions';
import { selectPredictions } from '../store/picks.selectors';

@Component({
  selector: 'app-dropdown-picks',
  templateUrl: './dropdown-picks.component.html',
  styleUrls: ['./dropdown-picks.component.scss'],
})
export class DropdownPicksComponent implements OnInit, PredictionFeature {
  // for dropdown lists
  players$: Observable<Player[]>;
  rookies$: Observable<Player[]>;

  // for the backend
  year: number = new Date().getFullYear();
  sport: 'Basketball' = 'Basketball';
  mvp: number;
  rookie: number;

  predictions: Predictions;
  @Input() isAdmin: boolean;
  // two cases
  // if admin page, don't display the current result
  // if not admin page, display the current result if exists

  form: FormGroup = new FormGroup({
    mvp: new FormControl(''),
    rookie: new FormControl(''),
  });
  // Previous predictions for non admin users
  prevMvp;
  prevRookie;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.setVariables();
    this.grabDataForDropdowns();
  }

  /**
   * Use this function to send the payload to the backend, call this from the template
   */
  submit(year: number, sport: 'Basketball', mvp: number, rookie: number): void {
    const payload: UpdatePredictionPayload = {
      year,
      sport,
      mvp: { id: this.predictions.mvp.id, player: mvp },
      rookie: { id: this.predictions.rookie.id, player: rookie },
    };
    if (this.isAdmin) {
      this.store.dispatch(
        lockInResults({
          results: payload,
        })
      );
    } else {
      this.store.dispatch(
        updateUserPredictions({
          predictions: payload,
        })
      );
    }
  }

  private setVariables(): void {
    this.store
      .select(selectPredictions)
      .pipe(
        map(cloneDeep),
        tap((predictions) => {
          this.year = predictions.year;
          this.sport = predictions.sport;
          this.predictions = predictions;

          if (!this.isAdmin) {
            this.mvp = predictions.mvp.player;
            this.rookie = predictions.rookie.player;
          }
        })
      )
      .subscribe();
  }

  private grabDataForDropdowns(): void {
    // the players list is already retrieved when the app loads so we just need to grab rookies
    this.store.dispatch(getAllPlayers({ rookies: true }));
    this.players$ = this.store.select(selectPlayers);
    this.rookies$ = this.store.select(selectPlayers);

    this.showPrevPredictions();
  }

  /**
   * Non admin users will have their previous predictions shown
   */
  private showPrevPredictions(): void {
    if (!this.isAdmin) {
      // TODO: Check if prev preditions exist

      // MVP
      this.players$.subscribe((data) => {
        if (data) {
          // Set value of form to prev mvp
          this.prevMvp = data.find((mvp) => mvp.id === this.mvp);
          this.form.get('mvp').setValue(this.prevMvp.id);
        }
      });

      // Rookie
      this.rookies$.subscribe((data) => {
        if (data) {
          // Set value of form to prev rookie
          this.prevRookie = data.find((rookie) => rookie.id === this.rookie);
          this.form.get('rookie').setValue(this.prevRookie.id);
        }
      });
    }
  }

  submitPicks(): void {
    this.mvp = Number(this.form.controls.mvp.value);
    this.rookie = Number(this.form.controls.rookie.value);
    this.submit(this.year, this.sport, this.mvp, this.rookie);
  }
}

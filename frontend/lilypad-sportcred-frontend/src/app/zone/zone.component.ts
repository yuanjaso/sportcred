import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionaireRegistrationDialogComponent } from '../login/questionaire-registration-dialog/questionaire-registration-dialog.component';
import { AppState } from '../store/reducer';
import { Store } from '@ngrx/store';
import { selectUserInfo } from '../auth/store/selectors';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { all_routes } from '../../global/routing-statics';
import * as actions from './store/actions';
import * as selectors from './store/selectors';
import * as types from './zone.types';
@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent implements OnInit {
  cardList = [
    all_routes.open_court,
    all_routes.predictions,
    all_routes.debate,
    all_routes.trivia,
  ];

  constructor(
    private titleService: Title,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.titleService.setTitle(all_routes.zone.title);
  }

  ngOnInit(): void {
    this.store
      .select(selectUserInfo)
      .pipe(first((info) => !!info))
      .subscribe((info) => {
        if (!info.questionaire_registered) {
          const dialogRef = this.dialog.open(
            QuestionaireRegistrationDialogComponent
          );
        }
      });
    this.store.dispatch(actions.getAllPlayers());
    this.store.dispatch(actions.getAllSportsTeams());

    // this.store
    //   .select(selectors.selectPlayers, {
    //     sportFilter: 'Basketball',
    //     customFilter: (player: types.Player) => player.first_name === 'Kyle',
    //   })
    //   .pipe(first((players) => players.length !== 0))
    //   .subscribe((players) => {
    //     console.log(players);
    //   });
    this.store
      .select(selectors.selectTeams, {
        sportFilter: 'Basketball',
        customFilter: (tean: types.Team) => tean.short_name === 'Raptors',
      })
      .pipe(first((teams) => teams !== undefined))
      .subscribe((teams) => {
        console.log(teams);
      });
  }
}

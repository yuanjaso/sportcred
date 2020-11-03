import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { all_routes } from '../../global/routing-statics';
import { selectUserInfo } from '../auth/store/selectors';
import { AppState } from '../store/reducer';
import * as actions from './store/actions';
import * as selectors from './store/selectors';
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
    this.fetchGlobalData();
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
  }

  /**
   * checks if vital data is in store,
   * if not, dispatch for it
   */
  fetchGlobalData(): void {
    this.store
      .select(selectors.selectPlayers)
      .pipe(first((players) => players === undefined))
      .subscribe(() => {
        console.log('fetching players');
        this.store.dispatch(actions.getAllPlayers());
      });
    this.store
      .select(selectors.selectTeams)
      .pipe(first((teams) => teams === undefined))
      .subscribe(() => {
        console.log('fetching teams');
        this.store.dispatch(actions.getAllSportsTeams());
      });
    this.store
      .select(selectors.selectSports)
      .pipe(first((sport) => sport === undefined))
      .subscribe(() => {
        console.log('fetching sports');
        this.store.dispatch(actions.getAllSports());
      });
  }
}

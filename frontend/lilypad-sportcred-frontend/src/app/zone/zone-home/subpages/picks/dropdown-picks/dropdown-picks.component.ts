import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../../store/reducer';
import { getAllPlayers } from '../../../../store/actions';
import { selectPlayers } from '../../../../store/selectors';
import { Player } from '../../../../zone.types';

@Component({
  selector: 'app-dropdown-picks',
  templateUrl: './dropdown-picks.component.html',
  styleUrls: ['./dropdown-picks.component.scss'],
})
export class DropdownPicksComponent implements OnInit {
  players$: Observable<Player[]>;
  rookies$: Observable<Player[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.grabDataForDropdowns();
  }

  private grabDataForDropdowns(): void {
    // the players list is already retrieved when the app loads so we just need to grab rookies
    this.store.dispatch(getAllPlayers({ rookies: true }));
    this.players$ = this.store.select(selectPlayers);
    this.rookies$ = this.store.select(selectPlayers);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../../../../store/reducer';
import * as types from './debate.types';
import { getDebateTopics } from './store/debate.actions';
import { selectDebateTopics } from './store/debate.selectors';
@Component({
  selector: 'app-debate',
  templateUrl: './debate.component.html',
  styleUrls: ['./debate.component.scss'],
})
export class DebateComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  constructor(private store: Store<AppState>) {}

  topics: types.DebateTopic[] = undefined;
  ngOnInit(): void {
    this.store.dispatch(getDebateTopics());
    this.subscriptions.add(
      this.store
        .select(selectDebateTopics)
        .pipe(filter((a) => !!a))
        .subscribe((a: types.DebateTopic[]) => {
          /**MOCK DATA */
          let mock: types.DebateTopic = {
            id: 1,
            acs_rank: types.playerRank.PRO_ANALYST,
            sport: 1,
            tite: 'mock title',
            content: 'mock content',
            post_date: new Date().getTime().toString(),
            num_of_comments: 32,
          };
          this.topics = [mock, mock];
          this.topics = [
            ...this.topics,
            ...this.topics,
            ...this.topics,
            ...this.topics,
            ...this.topics,
            ...this.topics,
            ...this.topics,
          ];

          console.log(a);
        })
    );
  }
  onOpenDebate(id: number) {
    console.log(id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

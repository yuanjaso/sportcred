import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../../../../store/reducer';
import * as types from './debate.types';
import { getDebateTopics } from './store/debate.actions';
import * as selectors from './store/debate.selectors';

@Component({
  selector: 'app-debate',
  templateUrl: './debate.component.html',
  styleUrls: ['./debate.component.scss'],
})
export class DebateComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  constructor(private store: Store<AppState>) {}

  topics: types.DebateTopic[];
  ngOnInit(): void {
    this.store.dispatch(getDebateTopics());
    // this.store.dispatch(getDebateDiscussion({ topics_id: 21 }));
    this.subscriptions.add(
      this.store
        .select(selectors.selectDebateTopics)
        .pipe(filter((a) => !!a))
        .subscribe((a: types.DebateTopic[]) => {
          this.topics = a;
        })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

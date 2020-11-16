import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { getDebateDiscussion, getDebateTopics } from './store/debate.actions';
@Component({
  selector: 'app-debate',
  templateUrl: './debate.component.html',
  styleUrls: ['./debate.component.scss'],
})
export class DebateComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getDebateTopics());
    this.store.dispatch(getDebateDiscussion({ topics_id: 21 }));
  }
}

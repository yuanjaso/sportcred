import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../../../../store/reducer';
import { DebateDiscussionDialogComponent } from './debate-discussion-dialog/debate-discussion-dialog.component';
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
  constructor(
    private store: Store<AppState>,
    public router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  topics: types.DebateTopic[] = undefined;
  ngOnInit(): void {
    //setup listener and dispatch for data
    this.listenForNav();
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
        })
    );
  }
  navToDebate(debateId: number) {
    this.router.navigate([], {
      queryParams: { debateId },
      relativeTo: this.route,
    });
  }

  listenForNav() {
    this.route.queryParams.subscribe((params) => {
      this.openDebateDiscussion(params);
    });
  }

  openDebateDiscussion(params: any) {
    if (params?.debateId) {
      const dialogRef = this.dialog.open(DebateDiscussionDialogComponent, {
        width: '90vw',
        height: '97vh',
        data: { debateId: parseInt(params.debateId) },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate([], {
          relativeTo: this.route,
        });
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

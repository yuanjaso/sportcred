import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../../../../store/reducer';
import { DebateDiscussionDialogComponent } from './debate-discussion-dialog/debate-discussion-dialog.component';
import * as types from './debate.types';
import { getDebateTopics } from './store/debate.actions';
import { selectAllDebateTopics } from './store/debate.selectors';
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
        .select(selectAllDebateTopics)
        .pipe(filter((a) => !!a))
        .subscribe((a: types.DebateTopic[]) => {
          this.topics = a;
        })
    );
  }
  listenForNav() {
    this.subscriptions.add(
      this.route.queryParams.subscribe((params) => {
        this.openDebateDiscussion(params);
      })
    );
  }

  openDebateDiscussion(params: any) {
    if (params?.debateId) {
      const dialogRef = this.dialog.open(DebateDiscussionDialogComponent, {
        width: '90vw',
        height: '95vh',
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

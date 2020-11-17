import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../../../store/reducer';
import { DebateComment, playerRank } from '../debate.types';
import { getDebateDiscussion } from '../store/debate.actions';
import { selectDebateTopic } from '../store/debate.selectors';
import { DebateService } from '../debate.service';
import { first } from 'rxjs/operators';
export interface DiscussionDialogData {
  debateId: number;
}

@Component({
  selector: 'app-debate-discussion-dialog',
  templateUrl: './debate-discussion-dialog.component.html',
  styleUrls: ['./debate-discussion-dialog.component.scss'],
})
export class DebateDiscussionDialogComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  discussion: DebateComment[] = undefined;
  debateTopic = undefined;
  constructor(
    public dialogRef: MatDialogRef<DiscussionDialogData>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DiscussionDialogData,
    private debateService: DebateService
  ) {
    this.store.dispatch(getDebateDiscussion({ topic_id: data.debateId }));
    this.store
      .select(selectDebateTopic, { debateId: data.debateId })
      .pipe(first((a) => !!a))
      .subscribe((debate) => {
        // todo filter invalid ids
        this.debateTopic = debate;
      });
    this.subscriptions.add(
      debateService.hotDebateDiscussion$.subscribe((discussion) => {
        this.discussion = discussion;
      })
    );
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

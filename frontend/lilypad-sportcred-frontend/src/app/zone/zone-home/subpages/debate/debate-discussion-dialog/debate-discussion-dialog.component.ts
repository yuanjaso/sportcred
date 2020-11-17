import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../../../store/reducer';
import { DebateComment, playerRank } from '../debate.types';
import { getDebateDiscussion } from '../store/debate.actions';
import { selectDebateTopics } from '../store/debate.selectors';
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
    @Inject(MAT_DIALOG_DATA) public data: DiscussionDialogData
  ) {
    this.store.dispatch(getDebateDiscussion({ topic_id: data.debateId }));
    this.subscriptions.add(
      this.store
        .select(selectDebateTopics, { debateId: data.debateId })
        .subscribe((debate) => {
          // todo filter invalid ids
          this.debateTopic = debate;
        })
    );
    //todo remove mock
    this.discussion = [
      {
        user: { id: 1, username: 'michael' },
        comment_id: 1,
        debate_id: 1,
        content: "thats why he's the goat",
        average_rating: 4.4,
        number_of_ratings: 1,
        comment_date: 'datetime in ISO',
      },
    ];
    this.discussion = [
      ...this.discussion,
      ...this.discussion,
      ...this.discussion,
      ...this.discussion,
      ...this.discussion,
    ];
    this.discussion = [
      ...this.discussion,
      ...this.discussion,
      ...this.discussion,
      ...this.discussion,
      ...this.discussion,
    ];
    this.debateTopic = {
      id: 1,
      acs_rank: playerRank.PRO_ANALYST,
      sport: 1,
      tite: 'mock title',
      content: 'mock content',
      post_date: new Date().getTime().toString(),
      num_of_comments: 32,
    };
    //END MOCK
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

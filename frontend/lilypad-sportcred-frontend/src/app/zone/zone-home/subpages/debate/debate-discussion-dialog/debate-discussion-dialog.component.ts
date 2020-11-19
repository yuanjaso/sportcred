import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  TrackByFunction,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../../../../../store/reducer';
import { DebateService } from '../debate.service';
import { DebateComment, DebateTopic, Rating } from '../debate.types';
import {
  getDebateDiscussion,
  postDebateComment,
  rateDebateComment,
} from '../store/debate.actions';
import { selectDebateTopic } from '../store/debate.selectors';

export interface DiscussionDialogData {
  debateId: number;
}

@Component({
  selector: 'app-debate-discussion-dialog',
  templateUrl: './debate-discussion-dialog.component.html',
  styleUrls: ['./debate-discussion-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DebateDiscussionDialogComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  discussion: DebateComment[] = undefined;
  debateTopic: DebateTopic = undefined;
  timedout = false;

  protected debateAnswer = '';
  protected debateRatings: { [commentId: number]: number } = {};
  // this track by is needed as the comments will get updated each time there is a rating change + new comment
  protected commentTrackBy: TrackByFunction<DebateComment> = (
    index: number,
    el
  ) => el.comment_id;

  constructor(
    public dialogRef: MatDialogRef<DiscussionDialogData>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DiscussionDialogData,
    private debateService: DebateService
  ) {}

  ngOnInit(): void {
    console.log(this.data.debateId);
    this.initTimer(5000);
    this.store
      .select(selectDebateTopic, { debateId: this.data.debateId })
      .pipe(filter((a) => !!a))
      .subscribe((debate) => {
        this.debateTopic = debate;
      });
    this.subscriptions.add(
      this.debateService.hotDebateDiscussion$.subscribe((discussion) => {
        this.discussion = discussion;
        discussion.forEach((comment) => {
          if (this.debateRatings[comment.comment_id] === undefined) {
            this.debateRatings[comment.comment_id] = 0;
          }
        });
      })
    );
    this.store.dispatch(getDebateDiscussion({ topic_id: this.data.debateId }));
  }

  //init timer for `timeout` ms, if discussion is still not loaded, show timeout
  initTimer(timeout) {
    setTimeout(() => {
      if (this.debateTopic === undefined) {
        this.timedout = true;
      }
    }, timeout);
  }

  /**
   * @param answer same value as `this.debateAnswer` but I passed it in so that the relationship is explicitly defined for readability
   */
  submitDebateAnswer(answer: string): void {
    this.store.dispatch(
      postDebateComment({
        payload: { content: answer, debate_id: this.data.debateId },
      })
    );
    // clear the answer
    this.debateAnswer = '';
  }

  // tslint:disable-next-line: variable-name
  submitRating(comment_id: number, rating: Rating): void {
    this.store.dispatch(rateDebateComment({ payload: { rating, comment_id } }));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

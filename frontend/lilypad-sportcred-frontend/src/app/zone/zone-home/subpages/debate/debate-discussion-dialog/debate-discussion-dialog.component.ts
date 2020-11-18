import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
})
export class DebateDiscussionDialogComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  discussion: DebateComment[] = undefined;
  debateTopic = undefined;
  timedout = false;
  constructor(
    public dialogRef: MatDialogRef<DiscussionDialogData>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DiscussionDialogData,
    private debateService: DebateService
  ) {}

  ngOnInit(): void {
    console.log(this.data.debateId);
    this.initTimer(5000);
    this.store.dispatch(getDebateDiscussion({ topic_id: this.data.debateId }));
    this.store
      .select(selectDebateTopic, { debateId: this.data.debateId })
      .pipe(first((a) => !!a))
      .subscribe((debate) => {
        this.debateTopic = debate;
      });
    this.subscriptions.add(
      this.debateService.hotDebateDiscussion$.subscribe((discussion) => {
        console.log(discussion);
        this.discussion = discussion;
      })
    );
  }

  //init timer for `timeout` ms, if discussion is still not loaded, show timeout
  initTimer(timeout) {
    setTimeout(() => {
      if (this.debateTopic === undefined) {
        this.timedout = true;
      }
    }, timeout);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

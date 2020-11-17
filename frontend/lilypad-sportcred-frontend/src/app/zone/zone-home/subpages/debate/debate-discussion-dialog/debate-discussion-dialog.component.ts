import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { DebateDiscussion } from '../debate.types';
import { getDebateDiscussion } from '../store/debate.actions';

interface DialogData {
  debateId: number;
}

@Component({
  selector: 'app-debate-discussion-dialog',
  templateUrl: './debate-discussion-dialog.component.html',
  styleUrls: ['./debate-discussion-dialog.component.scss'],
})
export class DebateDiscussionDialogComponent implements OnInit {
  discussion: DebateDiscussion = undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogData>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.store.dispatch(getDebateDiscussion({ topic_id: data.debateId }));
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

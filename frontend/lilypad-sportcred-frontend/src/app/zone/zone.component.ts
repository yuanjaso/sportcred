import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionaireRegistrationDialogComponent } from '../login/questionaire-registration-dialog/questionaire-registration-dialog.component';
import { AppState } from '../store/reducer';
import { Store } from '@ngrx/store';
import { selectUserInfo } from '../auth/store/selectors';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent implements OnInit {
  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectUserInfo)
      .pipe(first((info) => !!info))
      .subscribe((info) => {
        if (!info.questionaire_registered) {
          const dialogRef = this.dialog.open(
            QuestionaireRegistrationDialogComponent
          );
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionaireRegistrationDialogComponent } from '../login/questionaire-registration-dialog/questionaire-registration-dialog.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const missingquestionairesetup = true;
    if (missingquestionairesetup) {
      const dialogRef = this.dialog.open(
        QuestionaireRegistrationDialogComponent
      );
    }
  }
}

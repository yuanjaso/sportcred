import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducer';
import { selectSports } from 'src/app/zone/store/selectors';
import { Sport } from 'src/app/zone/zone.types';
import { submitDebatePost } from '../store/admin.actions';

@Component({
  selector: 'app-add-debate-dialog',
  templateUrl: './add-debate-dialog.component.html',
  styleUrls: ['./add-debate-dialog.component.scss'],
})
export class AddDebateDialogComponent implements OnInit {
  analystRank = [
    { id: 'E', name: 'Expert Analyst' },
    { id: 'P', name: 'Pro Analyst' },
    { id: 'A', name: 'Analyst' },
    { id: 'F', name: 'Fanalyst' },
  ];

  form: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
    content: new FormControl(''),
    sport: new FormControl('', Validators.required),
    acs_rank: new FormControl('', Validators.required),
  });

  $sports: Observable<Sport[]>;

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<AddDebateDialogComponent>
  ) {}

  ngOnInit(): void {
    // Get list of sports
    this.$sports = this.store.select(selectSports);
  }

  submitNewDebate() {
    if (this.form.status === 'INVALID') return;
    this.store.dispatch(
      submitDebatePost({
        submission: {
          title: this.form.controls.title.value,
          content: this.form.controls.content.value,
          sport: this.form.controls.sport.value,
          acs_rank: this.form.controls.acs_rank.value,
        },
      })
    );
    this.dialogRef.close();
  }
}

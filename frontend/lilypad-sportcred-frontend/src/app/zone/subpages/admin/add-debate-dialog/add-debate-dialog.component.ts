import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    rank: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  submitNewDebate() {
    if (this.form.status === 'INVALID') return;
  }
}

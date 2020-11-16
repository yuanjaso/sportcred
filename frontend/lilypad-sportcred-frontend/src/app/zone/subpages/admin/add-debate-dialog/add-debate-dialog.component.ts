import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-debate-dialog',
  templateUrl: './add-debate-dialog.component.html',
  styleUrls: ['./add-debate-dialog.component.scss']
})
export class AddDebateDialogComponent implements OnInit {

  constructor() { }

  form: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]),
  });

  ngOnInit(): void {
  }

  submitNewDebate() {
    console.log("clicked done");
    if (this.form.status === 'INVALID') return;

  }

  
}

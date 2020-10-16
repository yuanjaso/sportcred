import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { tryRegister, getQuestionaire } from '../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
    cpassword: new FormControl('', [this.retypeConfirm()]),
  });
  //passwordChange emits when password is edited, we need this
  // to update confirm password validity cocurrently
  passwordChange: Subscription;

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.passwordChange = this.form.controls.password.valueChanges.subscribe(
      () => {
        this.form.controls.cpassword.updateValueAndValidity();
      }
    );
  }
  register() {
    // if inputs not valid based on validators
    console.log(this.form);
    //if (this.form.status === 'INVALID') return;

    let username = this.form.controls.username.value;
    let email = this.form.controls.email.value;
    let password = this.form.controls.password.value;

    this.store.dispatch(tryRegister({ username, email, password }));
  }

  // CUSTOM VALIDATOR : makes sure cpassword is the same as password
  retypeConfirm(): ValidatorFn {
    return (control: FormControl) => {
      if (!control || !control.parent) {
        return null;
      }
      return control.parent.get('password').value === control.value
        ? null
        : { mismatch: true };
    };
  }

  // clean up logic
  // unsubscribe from all
  ngOnDestroy(): void {
    this.passwordChange.unsubscribe();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

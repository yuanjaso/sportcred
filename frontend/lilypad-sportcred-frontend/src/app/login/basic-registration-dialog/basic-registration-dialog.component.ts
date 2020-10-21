import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { tryRegisterBasic } from '../store/actions';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-basic-registration-dialog',
  templateUrl: './basic-registration-dialog.component.html',
  styleUrls: ['./basic-registration-dialog.component.scss'],
})
export class BasicRegistrationDialogComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<BasicRegistrationDialogComponent>,
    private store: Store<AppState>,
    private loginService: LoginService
  ) {}
  subscription = new Subscription();

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

  //registrationSpamBlock prevents register button from being spammed
  registrationSpamBlock: boolean = false;
  ngOnInit(): void {
    this.subscription.add(
      this.form.controls.password.valueChanges.subscribe(() => {
        //makes sure confirm password updates WITH password
        this.form.controls.cpassword.updateValueAndValidity();
      })
    );
    this.subscription.add(
      this.loginService.$registrationStatus.subscribe((status) => {
        //status is true if account is successfully added

        if (status) {
          this.onNoClick();
        } else {
          // since status is false, we assume email or username is taken
          // set error as such, disable block
          this.form.controls.email.setErrors({ taken: true });
          this.form.controls.username.setErrors({ taken: true });
          this.registrationSpamBlock = false;
        }
      })
    );
  }
  register() {
    // if inputs not valid based on validators
    if (this.form.status === 'INVALID') return;

    let username = this.form.controls.username.value;
    let email = this.form.controls.email.value;
    let password = this.form.controls.password.value;
    this.registrationSpamBlock = true;
    this.store.dispatch(tryRegisterBasic({ username, email, password }));
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
  onNoClick(): void {
    this.dialogRef.close();
  }
  // clean up logic
  // unsubscribe from all
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { generalRegistrationInfo } from '../../models';

//this component handles  the first page registration
// (getting user name, ... validation)
// the first page of the swiper in register dialog
@Component({
  selector: 'app-first-page-registration',
  templateUrl: './first-page-registration.component.html',
  styleUrls: ['./first-page-registration.component.scss'],
})
export class FirstPageRegistrationComponent implements OnInit {
  @Output() emitRegInfo = new EventEmitter<generalRegistrationInfo>();

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
  //todo check if email already exists

  //passwordChange emits when password is edited, we need this
  // to update confirm password validity cocurrently
  passwordChange: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.passwordChange = this.form.controls.password.valueChanges.subscribe(
      () => {
        this.form.controls.cpassword.updateValueAndValidity();
      }
    );
  }
  register() {
    // if inputs not valid based on validators
    if (this.form.status === 'INVALID') return;

    let username = this.form.controls.username.value;
    let email = this.form.controls.email.value;
    let password = this.form.controls.password.value;

    this.emitRegInfo.emit({ username, email, password });
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
}

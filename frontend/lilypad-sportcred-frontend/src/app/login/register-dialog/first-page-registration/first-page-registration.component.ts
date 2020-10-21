import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { tryRegisterBasic } from '../../store/actions';
import { LoginService } from '../../login.service';
//this component handles  the first page registration
// (getting user name, ... validation)
// the first page of the swiper in register dialog
@Component({
  selector: 'app-first-page-registration',
  templateUrl: './first-page-registration.component.html',
  styleUrls: ['./first-page-registration.component.scss'],
})
export class FirstPageRegistrationComponent implements OnInit {
  subscription = new Subscription();
  @Output() success = new EventEmitter<boolean>();

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

  //registrationSpamBlock prevents register button from being spammed
  registrationSpamBlock: boolean = false;
  constructor(
    private store: Store<AppState>,
    private loginService: LoginService
  ) {}

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
          this.success.emit(true);
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

  // clean up logic
  // unsubscribe from all
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

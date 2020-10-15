import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { tryRegister } from '../../auth/store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    cpassword: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  register() {
    let username = this.form.controls.username.value;
    let email = this.form.controls.email.value;
    let password = this.form.controls.password.value;
    if (this.verifyFormValitity()) {
      this.store.dispatch(tryRegister({ username, email, password }));
    }
  }
  /**
   * Return true if fields in form are valid for registration
   * this means
   * username is a valid string
   * email is a valid email
   * password is secure enough
   * cpassword is equal to password
   *
   * return false else
   */
  verifyFormValitity() {
    return true;
    //todo
  }
}

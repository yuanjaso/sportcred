import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { all_routes } from '../../global/routing-statics';
import { getUserInfo, clearLoginToken } from '../auth/store/actions';
import { AppState } from '../store/reducer';
import { MatDialog } from '@angular/material/dialog';
import { BasicRegistrationDialogComponent } from './basic-registration-dialog/basic-registration-dialog.component';
import { LoginService } from './login.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit(): void {}
  constructor(
    private titleService: Title,
    private store: Store<AppState>,
    private LoginService: LoginService,
    public dialog: MatDialog
  ) {
    this.store.dispatch(clearLoginToken());
    this.titleService.setTitle(all_routes.login.title);
    this.subscriptions.add(
      this.LoginService.$loginStatus.subscribe((status) => {
        if (!status) {
          this.form.controls.email.setErrors({ incorrect: true });
          this.form.controls.password.setErrors({ incorrect: true });
        }
      })
    );
  }
  signin(): void {
    if (!this.form.valid) return;
    const email = this.form.controls.email.value;
    const password = this.form.controls.password.value;
    this.store.dispatch(getUserInfo({ username: email, password }));
  }
  register(): void {
    const dialogRef = this.dialog.open(BasicRegistrationDialogComponent);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

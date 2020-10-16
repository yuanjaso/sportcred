import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { all_routes } from '../../global/routing-statics';
import { getLoginToken } from '../auth/store/actions';
import { AppState } from '../store/reducer';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit(): void {}
  constructor(
    private titleService: Title,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.titleService.setTitle(all_routes.login.title);
  }
  signin() {
    if (!this.form.valid) return;
    let email = this.form.controls.email.value;
    let password = this.form.controls.password.value;
    this.store.dispatch(getLoginToken({ email, password }));
  }
  register() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    // });
  }
}

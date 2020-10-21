import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppState } from '../store/reducer';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '../auth/store/selectors';
import { switchMap } from 'rxjs/operators';

// this class intercepts all http requests, and attaches the token to the header

// the backend will be looking for this attached token, it tells the backend if user
// is authenticated, and the sender's identity
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthToken).pipe(
      switchMap((jwt) => {
        req = req.clone({
          setHeaders: {
            Authorization: `Token ${jwt}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
        return next.handle(req);
      })
    );
  }
}

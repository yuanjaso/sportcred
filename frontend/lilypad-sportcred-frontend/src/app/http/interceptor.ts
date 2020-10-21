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
import { selectUserInfo } from '../auth/store/selectors';
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
    return this.store.select(selectUserInfo).pipe(
      switchMap((info) => {
        if (!!info?.token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Token ${info.token}`,
            },
          });
        }
        return next.handle(req);
      })
    );
  }
}

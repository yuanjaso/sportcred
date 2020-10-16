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
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthToken).pipe(
      switchMap((jwt) => {
        if (!!jwt) {
          req = req.clone({
            setHeaders: {
              Authorization: `Token ${jwt}`,
            },
          });
        }
        return next.handle(req);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { all_routes } from '../../global/routing-statics';
import { AppState } from '../store/reducer';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '../auth/store/selectors';
import { first } from 'rxjs/operators';

//this class guards URLS
// if a url is guarded, the user will not be allowed to go there
// unless they have a valid token in the store
// the user can only obtain a valid token via logging in

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private store: Store<AppState>) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let authenticated = await this.store
      .select(selectAuthToken)
      .pipe(first())
      .toPromise();
    // !! casts authenticated to boolean, so '' is false
    // third ! will negate
    if (!!!authenticated) {
      this.router.navigate([all_routes.login.url]);
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { all_routes } from '../../global/routing-statics';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    //TODO get auth
    let authenticated = false;
    if (!authenticated) {
      this.router.navigate([all_routes.login.url]);
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { getUserData } from 'src/app/core/shared/functions/helpers';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> | UrlTree {
    if (getUserData()) {
      return this.router.createUrlTree(['/']);
    }

    return !getUserData();
  }
}

@Injectable({ providedIn: 'root' })
export class TokenGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> | UrlTree {
    if (!getUserData()) {
      return this.router.createUrlTree(['/']);
    }

    return !!getUserData();
  }
}

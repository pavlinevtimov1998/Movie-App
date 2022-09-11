import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  subscription!: Subscription;
  isLoggedIn!: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.subscription = this.authService.isLoggedIn$.subscribe((isLogged) => {
      this.isLoggedIn = isLogged;
    });

    if (
      route.url.find((obj) => obj.path == 'login' || obj.path == 'register') &&
      this.isLoggedIn
    ) {
      this.subscription.unsubscribe();
      this.router.navigate(['/']);
      return false;
    } else if (
      route.url.find((obj) => obj.path == 'create') &&
      !this.isLoggedIn
    ) {
      this.subscription.unsubscribe();
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}

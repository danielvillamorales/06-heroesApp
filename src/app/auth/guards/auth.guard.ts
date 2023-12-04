import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router : Router
    ){}

  private checkAuthStatus(): Observable<boolean> | boolean {
    return this.authService.checkAuthetication()
      .pipe(
        tap(isAuth => {
          if (!isAuth) this.router.navigate(['./auth/login']);
        })
      );
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    console.log('canActivate');
    console.log({route , state })
   return this.checkAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    console.log('canMatch');
    console.log({route , segments })
    return this.checkAuthStatus();
  }

}

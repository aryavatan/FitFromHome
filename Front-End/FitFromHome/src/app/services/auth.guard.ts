import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private httpService: HTTPService, private router: Router) {}

  // auth guard class to prevent anyone from being able to access admin routes
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |  Observable<boolean> |  Promise<boolean> {
    const isAuth = this.httpService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  canActivate(): boolean {
    let user = localStorage.getItem('authKey');
    if (user != null) {
      let expired = this.tokenExpired(user);
      if (expired) {
        this.router.navigate(['/auth']);
        return false;
      } else {
        return true;
      }
    }
    else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}

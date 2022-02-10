import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(): boolean {
    let user = localStorage.getItem('roleKey');
    if (user == "USER") {
      this.router.navigate(['/auth']);
      return false;
    }
    else
      return true;
  }
}

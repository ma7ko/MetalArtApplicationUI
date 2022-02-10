import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthRequest, AuthResponse } from './request/auth-request';
import { Observable } from 'rxjs';
import { API_URL, AUTHENTICATION_URL } from '../route-constants/route-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  authenticate(authRequest: AuthRequest): Observable<AuthResponse>{
    return this.httpClient.post<any>(`${API_URL}${AUTHENTICATION_URL}`, authRequest);
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  isLoggedIn() {
    let user = localStorage.getItem('authKey');
    if (user != null) {
      let expired = this.tokenExpired(user);
      if (expired) {
        return false;
      } else {
        return true;
      }
    }
    else {
      return false;
    }
  }

  isAdminUser() {
    let user = localStorage.getItem('roleKey');
    if (user == "USER")
      return false;
    else 
      return true;
  }
}

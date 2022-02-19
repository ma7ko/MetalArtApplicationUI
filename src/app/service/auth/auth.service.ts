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
}

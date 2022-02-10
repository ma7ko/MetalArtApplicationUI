import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../route-constants/route-constants';
import { RegisterRequest } from './request/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post<any>(`${API_URL}/user/register`, registerRequest);
  }
}

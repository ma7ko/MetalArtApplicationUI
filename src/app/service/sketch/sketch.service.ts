import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../route-constants/route-constants';
import { SketchRequest } from './request/sketch-request';

@Injectable({
  providedIn: 'root'
})
export class SketchService {

  constructor(private httpClient: HttpClient) { }

  getAuthorizationHeader() {
    const authKey = localStorage.getItem('authKey');
    if (authKey != null) {
      return {
        headers: new HttpHeaders({
          Authorization: authKey,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': ['Content-Type', 'Authorization']
        })
      };
    } 
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': ['Content-Type', 'Authorization']
      })
    };
  }

  getAllSketches(): Observable<any> {
    const httpOptions = this.getAuthorizationHeader();
    return this.httpClient.get<any>(`${API_URL}/sketch`, httpOptions);
  }
  
  sendSketch(request: any, file?: any): Observable<any> {
    const httpOptions = this.getAuthorizationHeader();

    const formData = new FormData();
    // Append file to the virtual form.
    console.log(file);
    if (file)
      formData.append('uploadedFile', file);
    console.log(file);

    // Optional, append other kev:val rest data to the form.
    Object.keys(request).forEach(key => {
      formData.append(key, request[key]);
    });

    return this.httpClient.post<any>(`${API_URL}/sketch`, formData, httpOptions);
  }

  addNewSketch(request: any, file?: any): Observable<any> {
    const httpOptions = this.getAuthorizationHeader();

    const formData = new FormData();
    // Append file to the virtual form.
    console.log(file);
    if (file)
      formData.append('uploadedFile', file);
    console.log(file);

    // Optional, append other kev:val rest data to the form.
    Object.keys(request).forEach(key => {
      formData.append(key, request[key]);
    });

    return this.httpClient.post<any>(`${API_URL}/sketch/create-sketch`, formData, httpOptions);
  }
}

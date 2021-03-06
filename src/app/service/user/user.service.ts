import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../route-constants/route-constants';
import { ProductToCartRequest, RegisterRequest } from './request/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userProducts: any;

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

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post<any>(`${API_URL}/user/register`, registerRequest);
  }

  addProductToUserCart(request: ProductToCartRequest): Observable<any>{
    const httpOptions = this.getAuthorizationHeader();
    return this.httpClient.post<any>(`${API_URL}/shopping-cart/add-product`, request, httpOptions);
  }

  getCartProducts() {
    return this.userProducts;
  }

  setCartProducts(products: any) {
    this.userProducts = products;
    console.log(this.userProducts);
  } 

  getUserProducts(username: any): Observable<any> {
    const httpOptions = this.getAuthorizationHeader();
    return this.httpClient.get<any>(`${API_URL}/shopping-cart/${username}/get-products`, httpOptions);
  }
}

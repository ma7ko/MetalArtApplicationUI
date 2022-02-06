import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, PRODUCTS_CREATE_URL, PRODUCTS_URL } from '../route-constants/route-constants';
import { ProductResponse } from './request/product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Array<ProductResponse>>{
    return this.httpClient.get<any>(`${API_URL}${PRODUCTS_URL}`);
  }

  create(product: any, file?: File): Observable<Array<ProductResponse>>{

    const formData = new FormData();
    // Append file to the virtual form.
    console.log(file);
    if (file)
      formData.append('uploadedFile', file);
      console.log(file);

    // Optional, append other kev:val rest data to the form.
    Object.keys(product).forEach(key => {
        formData.append(key, product[key]);
    });

    return this.httpClient.post<any>(`${API_URL}${PRODUCTS_CREATE_URL}`, formData);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authKey } from '../route-constants/auth-key';
import { API_URL, PRODUCTS_BULK_DELETE, PRODUCTS_CREATE_URL, PRODUCTS_SIMILAR_PRODUCTS, PRODUCTS_UPDATE_URL, PRODUCTS_URL } from '../route-constants/route-constants';
import { PagedResponse, ProductResponse } from './request/product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  clickedProduct: ProductResponse = new ProductResponse();

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

  getClickedProduct() {
    return this.clickedProduct;
  }

  setClickedProduct(product: ProductResponse) {
    this.clickedProduct = product;
  }

  getAll(page: number): Observable<PagedResponse> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("size", 12);
    return this.httpClient.get<any>(`${API_URL}${PRODUCTS_URL}`, { params: queryParams });
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.httpClient.get<any>(`${API_URL}${PRODUCTS_URL}/${id}/details`);
  }

  create(product: any, file?: File): Observable<Array<ProductResponse>> {
    const httpOptions = this.getAuthorizationHeader();
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

    console.log(formData);

    return this.httpClient.post<any>(`${API_URL}${PRODUCTS_CREATE_URL}`, formData, httpOptions);
  }

  update(product: any, id: any, file?: File): Observable<Array<ProductResponse>> {

    const httpOptions = this.getAuthorizationHeader();
    console.log(httpOptions);
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

    console.log(formData);

    return this.httpClient.put<any>(`${API_URL}${PRODUCTS_URL}/${id}${PRODUCTS_UPDATE_URL}`, formData, httpOptions);
  }

  bulkDeleteProducts(products: Array<string>): Observable<any> {
    const httpOptions = this.getAuthorizationHeader();
    return this.httpClient.post<any>(`${API_URL}${PRODUCTS_BULK_DELETE}`, products, httpOptions);
  }

  getSimilarProducts(productId: number): Observable<any> {
    return this.httpClient.get<any>(`${API_URL}${PRODUCTS_URL}/${productId}${PRODUCTS_SIMILAR_PRODUCTS}`);
  }

  deleteProduct(id: number): Observable<any> {
    const httpOptions = this.getAuthorizationHeader();
    return this.httpClient.delete<any>(`${API_URL}${PRODUCTS_URL}/${id}/delete`, httpOptions);
  }
}

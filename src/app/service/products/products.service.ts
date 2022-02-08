import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, PRODUCTS_BULK_DELETE, PRODUCTS_CREATE_URL, PRODUCTS_SIMILAR_PRODUCTS, PRODUCTS_URL } from '../route-constants/route-constants';
import { PagedResponse, ProductResponse } from './request/product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  clickedProduct: ProductResponse = new ProductResponse();

  constructor(private httpClient: HttpClient) { }

  getClickedProduct() {
    return this.clickedProduct;
  }

  setClickedProduct(product: ProductResponse) {
    this.clickedProduct = product;
  }

  getAll(page: number): Observable<PagedResponse>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("size", 12);
    return this.httpClient.get<any>(`${API_URL}${PRODUCTS_URL}`, {params: queryParams});
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.httpClient.get<any>(`${API_URL}${PRODUCTS_URL}/${id}`);
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

    console.log(formData);

    return this.httpClient.post<any>(`${API_URL}${PRODUCTS_CREATE_URL}`, formData);
  }

  bulkDeleteProducts(products: Array<string>): Observable<any> {
    return this.httpClient.post<any>(`${API_URL}${PRODUCTS_BULK_DELETE}`, products);
  }

  getSimilarProducts(productId: number): Observable<any> {
    return this.httpClient.get<any>(`${API_URL}${PRODUCTS_URL}/${productId}${PRODUCTS_SIMILAR_PRODUCTS}`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${API_URL}${PRODUCTS_URL}/${id}/delete`);
  }
}

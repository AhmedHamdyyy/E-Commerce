import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { AllProductsResponse, Product } from '../../../shared/models/iproduct.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }

  getAllProduct(): Observable<AllProductsResponse> {
    return this._httpClient.get<AllProductsResponse>(`${environment.baseUrl}/api/v1/products`)
  }

  getSpecificProduct(productId: string): Observable<{ data: Product }> {
    return this._httpClient.get<{ data: Product }>(`${environment.baseUrl}/api/v1/products/${productId}`)
  }

}

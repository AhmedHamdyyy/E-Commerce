import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Brand } from '../../../shared/models/iproduct.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

  _httpClient: HttpClient = inject(HttpClient);

  getAllBrands(): Observable<any> {
    return this._httpClient.get<any>(`${environment.baseUrl}/api/v1/brands`)
  }

  getSpecificBrand(brandId: string): Observable<{ data: Brand }> {
    return this._httpClient.get<{ data: Brand }>(`${environment.baseUrl}/api/v1/brands/${brandId}`)
  }

}

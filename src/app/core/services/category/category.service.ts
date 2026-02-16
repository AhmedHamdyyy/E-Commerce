import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Category } from '../../../shared/models/iproduct.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private _httpClient: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this._httpClient.get<any>(`${environment.baseUrl}/api/v1/categories`)
  }

  getSpecificCategory(categoryId: string): Observable<{ data: Category }> {
    return this._httpClient.get<{ data: Category }>(`${environment.baseUrl}/api/v1/categories/${categoryId}`)
  }

}

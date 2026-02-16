import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { CartResponse } from '../../../shared/models/Icart';
import { CheckPlatFormService } from '../../../shared/services/checkPlatForm/check-plat-form.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  _httpClient: HttpClient = inject(HttpClient);

  _checkPlatFormService: CheckPlatFormService = inject(CheckPlatFormService);

  // signal or behaviorSubject
  NumberofItemsInCart: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    if (this._checkPlatFormService.checkIsPlatFormBrowser()) {
      this.getLoggedUserCart().subscribe({
        next: (res) => {
          this.NumberofItemsInCart.next(res.numOfCartItems);
          console.log('NumberofItemsInCart', this.NumberofItemsInCart.getValue());
        }
      });
    }
  }

  // iterface >>> في حالة اني مش هعرضوا في html مش لازم اعمل iterface
  addProductToCart(productId: string): Observable<any> {
    return this._httpClient.post<any>(`${environment.baseUrl}/api/v2/cart`,
      {
        productId: productId
      },
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    );
  }

  getLoggedUserCart(): Observable<CartResponse> {
    return this._httpClient.get<CartResponse>(`${environment.baseUrl}/api/v1/cart`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    });
  }

  UpdateProductCartCount(productId: string, count: string): Observable<CartResponse> {
    return this._httpClient.put<CartResponse>(`${environment.baseUrl}/api/v1/cart/${productId}`,
      {
        count: count
      },
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      });
  }

  RemoveSpecificProductFromCart(productId: string): Observable<CartResponse> {
    return this._httpClient.delete<CartResponse>(`${environment.baseUrl}/api/v1/cart/${productId}`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    });
  }

  ClearCarts(): Observable<any> {
    return this._httpClient.delete<any>(`${environment.baseUrl}/api/v1/cart`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    });
  }

}
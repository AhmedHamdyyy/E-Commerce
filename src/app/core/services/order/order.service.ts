import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { ShippingAddressData } from '../../../shared/models/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  _httpClient: HttpClient = inject(HttpClient);

  createCashOrder(cartId: string, ShippingData: ShippingAddressData): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v2/orders/${cartId}`,
      {
        shippingAddress: ShippingData,
      }
      //وقفتها لإني ببعتها من خلال ال interceptor >> setHeaderInterceptor
      // ,
      // {
      //   headers: {
      //     token: localStorage.getItem('userToken') || ''
      //   }
      // }
    );
  }

  checkoutOnlineOrder(cartId: string, ShippingData: ShippingAddressData): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.domain}`,
      {
        shippingAddress: ShippingData,
      }
      //وقفتها لإني ببعتها من خلال ال interceptor >> setHeaderInterceptor
      // ,
      // {
      //   headers: {
      //     token: localStorage.getItem('userToken') || ''
      //   }
      // }
    );
  }

}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { CheckPlatFormService } from '../../../shared/services/checkPlatForm/check-plat-form.service';
import { WishlistData, AllWishlistResponse } from '../../../shared/models/wishlist.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  _httpClient: HttpClient = inject(HttpClient);
  _checkPlatFormService: CheckPlatFormService = inject(CheckPlatFormService);

  NumberofItemsInWishList = signal<number>(0);
  wishlistIds = signal<string[]>([]);

  constructor() {
    if (this._checkPlatFormService.checkIsPlatFormBrowser()) {
      this.getLoggedUserWishlist().subscribe({
        next: (res) => {
          this.NumberofItemsInWishList.set(res.count || res.data?.length || 0);
          const ids = res.data?.map((item: any) => item._id || item.id) || [];
          this.wishlistIds.set(ids);
        }
      });
    }
  }

  addProductToWishlist(productId: string): Observable<AllWishlistResponse> {
    return this._httpClient.post<AllWishlistResponse>(`${environment.baseUrl}/api/v1/wishlist`, {
      productId: productId
    }).pipe(
      tap((res) => {
        this.wishlistIds.update(ids => [...ids, productId]);
        const count = res.count ?? res.data?.length ?? this.NumberofItemsInWishList() + 1;
        this.NumberofItemsInWishList.set(count);
      })
    );
  }

  getLoggedUserWishlist(): Observable<AllWishlistResponse> {
    return this._httpClient.get<AllWishlistResponse>(`${environment.baseUrl}/api/v1/wishlist`);
  }

  RemoveSpecificProductFromWishlist(productId: string): Observable<AllWishlistResponse> {
    return this._httpClient.delete<AllWishlistResponse>(
      `${environment.baseUrl}/api/v1/wishlist/${productId}`
    ).pipe(
      tap((res) => {
        this.wishlistIds.update(ids => ids.filter(id => id !== productId));
        const count = res.count ?? res.data?.length ?? this.NumberofItemsInWishList() - 1;
        this.NumberofItemsInWishList.set(count);
      })
    );
  }
}
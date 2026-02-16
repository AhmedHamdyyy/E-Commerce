import { Component, computed, effect, inject, input, Signal, signal, WritableSignal } from '@angular/core';
import { Product } from '../../models/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { NgClass } from '@angular/common';
import { AllWishlistResponse } from '../../models/wishlist.interface';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-productcard',
  imports: [RouterLink, TranslatePipe, NgClass],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss',
})
export class ProductcardComponent {

  // productdata = اللي هستقبل في الداتا
  productdata = input<Product>({} as Product);

  _cartService: CartService = inject(CartService);

  _authService: AuthService = inject(AuthService);

  _wishlistService: WishlistService = inject(WishlistService);

  toastr = inject(ToastrService);

  isLogin: boolean = false;

  constructor() {
    effect(() => {
      if (this._authService.userData() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    })
  }

  addProductToCart(productId: string) {
    this._cartService.addProductToCart(productId).subscribe((res) => {
      console.log(res);
      // alert(res.message);
      this.toastr.success(res.message, 'Product Added To Cart', {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing',
      });

      // update the number of items in the cart
      this._cartService.NumberofItemsInCart.next(res.numOfCartItems);

    });
  }

  isInWishlist: Signal<boolean> = computed(() => {
    const productId = this.productdata()?._id;
    if (!productId) return false;
    return this._wishlistService.wishlistIds().includes(productId);
  });

  isWishlistLoading = signal<boolean>(false);

  toggleWishlist(productId: string): void {
    debugger
    if (this.isWishlistLoading()) return;

    this.isWishlistLoading.set(true);

    if (this.isInWishlist()) {
      // 🔴 Remove
      this._wishlistService.RemoveSpecificProductFromWishlist(productId).subscribe({
        next: (res: AllWishlistResponse) => {
          this.toastr.error(res.status, 'Product Removed From Wishlist', {
            timeOut: 2000,
            positionClass: 'toast-top-left',
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.isWishlistLoading.set(false);
        },
        error: () => this.isWishlistLoading.set(false)
      });
    } else {
      // 🟢 Add
      this._wishlistService.addProductToWishlist(productId).subscribe({
        next: (res) => {
          this.toastr.success(res.status, 'Product Added To Wishlist', {
            timeOut: 2000,
            positionClass: 'toast-top-left',
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.isWishlistLoading.set(false);
        },
        error: () => this.isWishlistLoading.set(false)
      });
    }
  }

}
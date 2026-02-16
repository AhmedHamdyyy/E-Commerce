import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, NgClass, TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {

  _wishlistService: WishlistService = inject(WishlistService);
  _cartService: CartService = inject(CartService);
  toastr = inject(ToastrService);

  wishlistList: WritableSignal<any[]> = signal<any[]>([]);

  WishlistItemsCount: Signal<number> = computed(() =>
    this._wishlistService.NumberofItemsInWishList()
  );

  ngOnInit(): void {
    this.getAllWishlist();
    this.WishlistItemsCount();

  }

  getAllWishlist() {
    this._wishlistService.getLoggedUserWishlist().subscribe((res) => {
      this.wishlistList.set(res.data);
      console.log(this.wishlistList());
    });
  }

  removeFromWishlist(productId: string) {
    this._wishlistService.RemoveSpecificProductFromWishlist(productId).subscribe({
      next: (res) => {
        this.wishlistList.update(list => list.filter(item => item._id !== productId));
        this.WishlistItemsCount();
        this.toastr.info(res.status, 'Product removed from wishlist', {
          timeOut: 2000,
          positionClass: 'toast-top-left',
          progressBar: true,
          progressAnimation: 'increasing',
        });
      }
    });
  }

  addToCart(productId: string) {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this.toastr.success(res.status, 'Added to Cart', {
          timeOut: 2000,
          positionClass: 'toast-top-left',
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this.WishlistItemsCount();
        this._cartService.NumberofItemsInCart.next(res.numOfCartItems);
      }
    });
  }
}
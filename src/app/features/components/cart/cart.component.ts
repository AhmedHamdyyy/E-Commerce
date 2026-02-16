import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { CartData } from '../../../shared/models/Icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {

  _cartService: CartService = inject(CartService);

  cartData: WritableSignal<CartData> = signal<CartData>({} as CartData)

  toastr = inject(ToastrService);

  ngOnInit(): void {

    this.getLoggedUserCart();

  }

  getLoggedUserCart() {
    this._cartService.getLoggedUserCart().subscribe((res) => {
      this.cartData.set(res.data);
      console.log(res.data);
    });
  }

  UpdateProductCartCount(productId: string, count: number) {
    this._cartService.UpdateProductCartCount(productId, count.toString()).subscribe({
      next: res => {

        //لعرض totalCartPrice >>> استخدم دي او اللي تحت
        this.cartData.set(res.data);
        // عشان تسمع في ال total فوق
        // this.getLoggedUserCart();
        console.log(res.data);

        // update the number of items in the cart
        this._cartService.NumberofItemsInCart.next(res.numOfCartItems);
      }
    });
  }

  RemoveSpecificProductFromCart(productId: string) {
    this._cartService.RemoveSpecificProductFromCart(productId).subscribe({
      next: res => {
        // totalCartPrice >>> عشان تأثر في ال  فوق
        this.cartData.set(res.data);
        console.log(res);

        // update the number of items in the cart
        this._cartService.NumberofItemsInCart.next(res.numOfCartItems);

        this.toastr.error('', 'Product Removed From Cart', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
          progressBar: true,
        });
      }
    });
  }

  ClearCart() {
    this._cartService.ClearCarts().subscribe({
      next: res => {
        this.getLoggedUserCart();

        // update the number of items in the cart
        this._cartService.NumberofItemsInCart.next(0);

        this.toastr.info('', 'Cart Cleared', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
          progressBar: true,
        });
      }
    });
  }

}

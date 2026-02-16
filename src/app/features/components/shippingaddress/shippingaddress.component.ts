import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../core/services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-shippingaddress',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './shippingaddress.component.html',
  styleUrl: './shippingaddress.component.scss',
})
export class ShippingaddressComponent {

  _orderService: OrderService = inject(OrderService);

  _cartService: CartService = inject(CartService);

  _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  _router: Router = inject(Router);

  // Using FormBuilder
  // syntax sugar formgroup
  fb: FormBuilder = inject(FormBuilder);

  shippingAddressForm: FormGroup = this.fb.group({
    details: ['', Validators.required],
    phone: ['', Validators.required],
    city: ['', Validators.required],
  })


  submitShippingAddressFormCash() {
    debugger
    if (this.shippingAddressForm.valid) {

      this._activatedRoute.paramMap.subscribe({
        next: data => {
          console.log(data.get('id'));

          this._orderService.createCashOrder(data.get('id')!, this.shippingAddressForm.value).subscribe({
            next: res => {
              console.log(res);

              //1. navigate to all order page
              this._router.navigate(['allorders']);
              //2. update the number of items in the cart
              this._cartService.NumberofItemsInCart.next(0);
            }
          });
        }
      });
    }
  }

  submitShippingAddressFormOnline() {
    debugger
    if (this.shippingAddressForm.valid) {

      this._activatedRoute.paramMap.subscribe({
        next: data => {
          console.log(data.get('id'));

          this._orderService.checkoutOnlineOrder(data.get('id')!, this.shippingAddressForm.value).subscribe({
            next: res => {
              console.log(res);

              //1. navigate interface strip
              window.open(res.session.url, '_self'); //_self >> عشان النستخدم يحس انها من ضمن صفحات الموقع بتاعي
              //2. update the number of items in the cart
              this._cartService.NumberofItemsInCart.next(0);
            }
          });
        }
      });
    }
  }

} 

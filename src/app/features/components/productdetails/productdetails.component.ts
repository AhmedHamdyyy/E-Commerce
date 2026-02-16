import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../shared/models/iproduct.interface';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale/onsale-pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-productdetails',
  imports: [OnsalePipe, CurrencyPipe, TitleCasePipe, DatePipe, TranslatePipe],//JsonPipe LowerCasePipe UpperCasePipe
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit {

  date = new Date();

  // ActivatedRoute >>> من خلالها اقدر اوصل للداتا المبعوتة في URL
  data: WritableSignal<Product> = signal<Product>({} as Product);
  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    //  params >> الطريقة الاولي 
    // this._activatedRoute.params.subscribe((data) => {
    //   this.getSpecificProduct(data['id']); //index signature
    //   console.log(data['id']);
    // })

    //  paramMap >> الطريقة الثانية 
    this._activatedRoute.paramMap.subscribe((d) => {
      this.getSpecificProduct(d.get('id')!); //index signature
      console.log(d.get('id'));
    })


  }

  getSpecificProduct(id: string) {
    this._productService.getSpecificProduct(id).subscribe((res) => {
      this.data.set(res.data);
      console.log(res.data);
    })
  }

  _cartService: CartService = inject(CartService);

  toastr = inject(ToastrService);

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

}

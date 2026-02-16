import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../shared/models/iproduct.interface';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductcardComponent } from '../../../shared/components/productcard/productcard.component';
import { SearchproductPipe } from '../../../shared/pipes/searchproduct/searchproduct-pipe';
import { SearchproductbypricePipe } from '../../../shared/pipes/searchproduct/searchproductbyprice-pipe';

@Component({
  selector: 'app-products',
  imports: [ProductcardComponent, SearchproductPipe, SearchproductbypricePipe, FormsModule, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {

  _productService: ProductService = inject(ProductService);

  productList: WritableSignal<Product[]> = signal<Product[]>([]);

  userSearch: string = "";
  userSearchByPrice: string = "";
  check: boolean = false;

  ngOnInit(): void {

    this.getAllProducts();

  }

  getAllProducts() {
    this._productService.getAllProduct().subscribe((res) => {
      this.productList.set(res.data)
      console.log(this.productList());
    })
  }
}

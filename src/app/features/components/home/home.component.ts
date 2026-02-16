import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomesliderComponent } from './homeslider/homeslider.component';
import { CategorysliderComponent } from '../../../shared/components/categoryslider/categoryslider.component';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../shared/models/iproduct.interface';
import { ProductcardComponent } from '../../../shared/components/productcard/productcard.component';
import { SearchproductPipe } from '../../../shared/pipes/searchproduct/searchproduct-pipe';
import { FormsModule } from '@angular/forms';
import { SearchproductbypricePipe } from '../../../shared/pipes/searchproduct/searchproductbyprice-pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [HomesliderComponent, CategorysliderComponent, ProductcardComponent, SearchproductPipe, SearchproductbypricePipe, FormsModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

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

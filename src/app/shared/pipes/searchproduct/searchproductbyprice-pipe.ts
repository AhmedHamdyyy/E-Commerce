import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/iproduct.interface';

@Pipe({
  name: 'searchproductbyprice',
})
export class SearchproductbypricePipe implements PipeTransform {

  transform(productList: Product[], userSearch: string): Product[] {
    return productList.filter((product, index) => {
      return product.price.toString().includes(userSearch);
    });
  }

}

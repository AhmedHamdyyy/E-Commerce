import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BrandService } from '../../../core/services/brand/brand.service';
import { Observable } from 'rxjs';
import { Brand } from '../../../shared/models/iproduct.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {


  _brandService: BrandService = inject(BrandService);

  brandList: WritableSignal<Brand[]> = signal<Brand[]>([]);

  ngOnInit(): void {

    this.getAllBrands();

  }

  getAllBrands() {
    this._brandService.getAllBrands().subscribe((res) => {
      this.brandList.set(res.data);
      console.log(res.data);
    });
  }

}

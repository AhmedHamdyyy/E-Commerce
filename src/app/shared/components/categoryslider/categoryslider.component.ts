import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../models/iproduct.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categoryslider',
  imports: [CarouselModule, TranslatePipe],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss',
})
export class CategorysliderComponent implements OnInit {

  _categoryService: CategoryService = inject(CategoryService)

  categoryList: WritableSignal<Category[]> = signal<Category[]>([]);

  ngOnInit(): void {

    this.getAllCategories();

  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe((res) => {
      this.categoryList.set(res.data)
      console.log(this.categoryList())
    })
  }


  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 7
      },
    },
    nav: false
  }
  slidesStore = signal<any[]>([
    { id: 'slide-1', text: 'Slide 1 HM', dataMerge: 2, width: 300, dotContent: 'text1' },
    { id: 'slide-2', text: 'Slide 2 HM', dataMerge: 1, width: 500, dotContent: 'text2' },
    { id: 'slide-3', text: 'Slide 3 HM', dataMerge: 3, width: 500, dotContent: 'text3' },
    { id: 'slide-4', text: 'Slide 4 HM', width: 450, dotContent: 'text4' },
    { id: 'slide-5', text: 'Slide 5 HM', dataMerge: 2, width: 500, dotContent: 'text5' },
    { id: 'slide-6', text: 'Slide 6', width: 500, dotContent: 'text5' },
    { id: 'slide-7', text: 'Slide 7', width: 500, dotContent: 'text6' },
    { id: 'slide-8', text: 'Slide 8', width: 500, dotContent: 'text8' },
    // { id: 'slide-7', text: 'Slide 7', dotContent: 'text5'},
    // { id: 'slide-8', text: 'Slide 8', dotContent: 'text5'},
    // { id: 'slide-9', text: 'Slide 9', dotContent: 'text5'},
    // { id: 'slide-10', text: 'Slide 10', dotContent: 'text5'},
  ]);



}



import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../shared/models/iproduct.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {


  constructor(private _categoryService: CategoryService) { }

  categoryList: WritableSignal<Category[]> = signal<Category[]>([]);

  getAllCategories(): Observable<any> {
    return this._categoryService.getAllCategories()
  }

  ngOnInit(): void {
    this.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}

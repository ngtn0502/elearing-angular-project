import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { CategoryService } from './../services/category.service';
import { Category } from './../shared/category.model';
import { CourseService } from './../services/course.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  chosenID: number = 0;

  constructor(
    private categoryService: CategoryService,
    private dataStorageService: DataStorageService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.categoryService.fetchData().subscribe((data) => {
      this.categories = data;
      console.log(data);
    });
  }

  onChooseCategory(id: number) {
    this.chosenID = id;
    this.dataStorageService.fetchDataByCategory(id);
  }
}

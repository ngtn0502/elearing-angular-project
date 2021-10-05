import { Component, Input, OnInit } from '@angular/core';
import { Course } from './../shared/course.model';
import { UiServices } from './../services/ui.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from './../services/category.service';
import { Category } from './../shared/category.model';
import { DataStorageService } from '../services/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.scss'],
})
export class ModelDetailComponent implements OnInit {
  @Input() course: Course;
  editForm: FormGroup = new FormGroup({});
  isFormValid: boolean = false;
  categories: Category[] = [];
  @Input() typeModel: string = '';
  constructor(
    private uiServices: UiServices,
    private categoryService: CategoryService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) {
    this.course = {
      id: 0,
      name: '',
      description: '',
      rating: 0,
      price: 0,
      categoryId: 1,
      imageUrl: '',
      instructor: '',
      productdetail: [],
    };
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(this.course.name, [
        Validators.required,
        Validators.minLength(5),
      ]),
      desc: new FormControl(this.course.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
      rating: new FormControl(this.course.rating, [
        Validators.required,
        Validators.minLength(1),
      ]),
      price: new FormControl(this.course.price, [
        Validators.required,
        Validators.minLength(2),
      ]),
      categoryId: new FormControl(this.course.categoryId, [
        Validators.required,
      ]),
      imageUrl: new FormControl(this.course.imageUrl, [
        Validators.required,
        Validators.minLength(5),
      ]),
      instructor: new FormControl(this.course.instructor, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.categoryService.fetchData().subscribe((data) => {
      this.categories = data;
    });
  }

  onCancel() {
    this.uiServices.closeModel();
  }

  onSubmit() {
    if (this.typeModel === 'new') {
      this.dataStorageService.postData(this.editForm.value);
      this.uiServices.closeModel();
      this.router.navigate(['/']);
    } else {
      this.dataStorageService.editData(this.editForm.value, this.course.id);
      this.uiServices.closeModel();
    }
  }
}

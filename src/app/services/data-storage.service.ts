import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data, Router } from '@angular/router';
import { Course } from './../shared/course.model';
import { CourseService } from './course.service';

const apiURL = 'https://localhost:5001/api/products';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private courseService: CourseService
  ) {}

  //   postData() {
  //     this.http.put(apiURL, this.recipeService.getRecipe()).subscribe((data) => {
  //       //   console.log(data);
  //     });
  //   }

  postData(form: any) {
    let newForm = {
      Name: form.name,
      Description: form.desc,
      Rating: form.rating,
      Price: form.price,
      ImageUrl: form.imageUrl,
      Instructor: form.instructor,
      CategoryId: form.categoryId,
    };
    console.log(newForm);

    this.http.post(apiURL, newForm).subscribe((data) => {
      this.fetchData();
    });
  }

  fetchData() {
    this.http.get<Course[]>(apiURL).subscribe((data) => {
      this.courseService.getCourses(data);
    });
  }

  fetchDataByCategory(id: number) {
    if (id == 0) {
      this.fetchData();
    } else {
      this.http
        .get<Course[]>(`${apiURL}/category?id=${id}`)
        .subscribe((data) => {
          this.courseService.getCourses(data);
          console.log(data);
        });
    }
  }

  fetchDataByID(id: number) {
    return this.http.get<Course>(`${apiURL}/${id}`);
  }

  editData(form: any, id: number) {
    let updatedForm = {
      Name: form.name,
      Description: form.desc,
      Rating: form.rating,
      Price: form.price,
      ImageUrl: form.imageUrl,
      Instructor: form.instructor,
      CategoryId: form.categoryId,
    };

    this.http
      .put(`${apiURL}/edit?query=${id}`, updatedForm)
      .subscribe((data) => {
        console.log(data);
        this.fetchData();
      });
  }

  deleteData(id: number) {
    this.http.delete(`${apiURL}/${id}`).subscribe((data) => {
      console.log(data);
      this.fetchData();
    });
  }
}

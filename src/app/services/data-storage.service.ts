import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data, Router } from '@angular/router';
import { Course } from './../shared/course.model';
import { CourseService } from './course.service';

const apiURL = 'https://localhost:5001/api/products';
const CategoryApiURL = 'https://localhost:5001/api/category';

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
  //     });
  //   }

  postCourses(form: any) {
    let newForm = {
      Name: form.name,
      Description: form.desc,
      Rating: form.rating,
      Price: form.price,
      ImageUrl: form.imageUrl,
      Instructor: form.instructor,
      CategoryId: form.categoryId,
    };

    return this.http.post(apiURL, newForm);
  }

  fetchCourses() {
    return this.http.get<Course[]>(apiURL);
  }

  fetchCoursesByCategory(id: number) {
    if (id == 0) {
      return this.fetchCourses();
    } else {
      return this.http.get<Course[]>(`${apiURL}/category?id=${id}`);
    }
  }

  fetchCourseByID(id: number) {
    return this.http.get<Course>(`${apiURL}/${id}`);
  }

  updateCourse(form: any, id: number) {
    let updatedForm = {
      Name: form.name,
      Description: form.desc,
      Rating: form.rating,
      Price: form.price,
      ImageUrl: form.imageUrl,
      Instructor: form.instructor,
      CategoryId: form.categoryId,
    };

    return this.http.put(`${apiURL}/edit?query=${id}`, updatedForm);
  }

  deleteCourse(id: number) {
    return this.http.delete(`${apiURL}/${id}`);
  }

  searchCourse(query: any) {
    return this.http.get(`${apiURL}/search?query=${query}`);
  }

  // fetch category data
  fetchCategory() {
    return this.http.get<any[]>(CategoryApiURL).pipe(
      map((category) => {
        const newCategory = category.map((el) => {
          return { id: el.id, name: el.name };
        });
        return [{ id: 0, name: 'All Courses' }, ...newCategory];
      })
    );
  }
}

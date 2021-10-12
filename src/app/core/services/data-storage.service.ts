import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data, Router } from '@angular/router';
import { Course } from './../shared/course.model';
import { apiURL, CategoryApiURL } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

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

  fetchCoursesByPage(id: number, pageNumber: number, pageSize: number) {
    return this.http.get<Course[]>(
      `${apiURL}/courses?category=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  fetchCoursesByCategory(id: number) {
    return this.http.get<Course[]>(`${apiURL}/courses?category=${id}`);
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
    const searchQuery = query.replace(/ /g, '');

    return this.http.get(`${apiURL}/search?query=${searchQuery}`);
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

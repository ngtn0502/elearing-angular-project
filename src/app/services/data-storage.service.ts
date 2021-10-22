import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseURL, CategoryBaseURL } from '../shared/config/config';
import { Course } from '../shared/model/course.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  // create functionality
  postCourses(form: any) {
    let newForm = {
      Name: form.name,
      Description: form.desc,
      Rating: form.rating,
      Price: form.price,
      ImageUrl: form.imageUrl,
      Instructor: form.instructor,
      CategoryId: form.categoryId,
      Language: form.language,
      Detail: form.detail,
    };

    return this.http.post(BaseURL, newForm);
  }

  fetchCourses() {
    return this.http.get<Course[]>(BaseURL);
  }

  fetchCoursesByPage(id: number, pageNumber: number, pageSize: number) {
    return this.http.get<Course[]>(
      `${BaseURL}/getpagedproducts?category=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  fetchCoursesByCategory(id: number) {
    return this.http.get<Course[]>(
      `${BaseURL}/getpagedproducts?category=${id}`
    );
  }

  fetchCourseByID(id: number) {
    return this.http.get<Course>(`${BaseURL}/${id}`);
  }

  // update functionality
  updateCourse(form: any, id: number) {
    let updatedForm = {
      Name: form.name,
      Description: form.desc,
      Rating: form.rating,
      Price: form.price,
      ImageUrl: form.imageUrl,
      Instructor: form.instructor,
      CategoryId: form.categoryId,
      Language: form.language,
      Detail: form.detail,
    };

    return this.http.put(`${BaseURL}/updateproduct?query=${id}`, updatedForm);
  }

  // delete functionality
  deleteCourse(id: number) {
    return this.http.delete(`${BaseURL}/${id}`);
  }

  // search functionality
  searchCourse(data: any) {
    const searchQuery = data.query.replace(/ /g, '');
    if (data.pageNumber) {
      return this.http.get(
        `${BaseURL}/searchproducts?query=${searchQuery}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`
      );
    }
    return this.http.get(`${BaseURL}/searchproducts?query=${searchQuery}`);
  }

  // fetch category data
  fetchCategory() {
    return this.http.get<any[]>(CategoryBaseURL).pipe(
      map((category) => {
        const newCategory = category.map((el) => {
          return { id: el.id, name: el.name };
        });
        return [{ id: 0, name: 'All Courses' }, ...newCategory];
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data, Router } from '@angular/router';
import { Course } from './../shared/course.model';

const apiURL = 'https://localhost:5001/api/products';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  courseChanged = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

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
      this.courseChanged.next();
    });
  }

  fetchData() {
    return this.http.get<Course[]>(apiURL);
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
        this.courseChanged.next();
      });
  }

  deleteData(id: number) {
    this.http.delete(`${apiURL}/${id}`).subscribe((data) => {
      console.log(data);
      this.courseChanged.next();
    });
  }
}

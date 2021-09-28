import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const apiURL = 'https://localhost:5001/api/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get<any[]>(apiURL).pipe(
      map((category) => {
        const newCategory = category.map((el) => {
          return { id: el.id, name: el.name };
        });
        return newCategory;
      })
    );
  }
}

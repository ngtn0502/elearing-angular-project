import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as UIActions from '../../store/ui/ui.action';
import { Store } from '@ngrx/store';
import * as CourseActions from '../../store/course/course.action';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  pageArray: any[] = [1, 2, 3, 4];
  currentPage: number = 1;
  pageSize: number = 3;
  totalPage: number = 0;
  haha: number = 0;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Logic for handle pagination in front end
    this.store.select('courses').subscribe((coursesState) => {
      this.pageArray = [];
      for (let i = 1; i <= coursesState.totalRecords; i++) {
        this.pageArray.push(i);
      }

      this.totalPage = Math.round(coursesState.totalRecords / this.pageSize);

      this.pageArray = this.pageArray.slice(0, this.totalPage);
    });
  }

  onChangePage(id: number) {
    this.currentPage = id;
    this.getCoursesByPage();
  }

  onNavigatePage(type: string) {
    if (type === 'prev') {
      this.currentPage--;
    } else {
      this.currentPage++;
    }
    this.getCoursesByPage();
  }

  getCoursesByPage() {
    this.activatedRoute.url.subscribe((url) => {
      let id = '0';
      if (url[1]) {
        id = url[1].path;
      }
      this.router.navigate(['/category', id], {
        queryParams: {
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
        },
      });
    });
  }
}

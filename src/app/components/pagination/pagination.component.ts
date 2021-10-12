import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as UIActions from '../../store/ui/ui.action';
import { Store } from '@ngrx/store';
import * as CourseActions from '../../store/course/course.action';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
  id: number = 0;

  private subscriptions = new Subscription();

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Logic for creating pagination bar in front end
    this.store.select('courses').subscribe((coursesState) => {
      this.pageArray = [];
      for (let i = 1; i <= coursesState.totalRecords; i++) {
        this.pageArray.push(i);
      }

      this.totalPage = Math.ceil(coursesState.totalRecords / this.pageSize);

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
    this.currentPage;
    this.getCoursesByPage();
  }

  getCoursesByPage() {
    this.subscriptions = this.activatedRoute.url.subscribe((url) => {
      if (url[1]) {
        if (Number(url[1].path) !== this.id) {
          this.currentPage = 1;
          this.pageSize = 3;
        }
        this.id = Number(url[1].path);
      }
      this.router.navigate(['/category', this.id], {
        queryParams: {
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
        },
      });
    });

    this.store.dispatch(
      new CourseActions.PaginationCoursesAction({
        id: Number(this.id),
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

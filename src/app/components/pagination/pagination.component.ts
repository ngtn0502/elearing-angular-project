import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as UIActions from '../../store/ui/ui.action';
import { Store } from '@ngrx/store';
import * as CourseActions from '../../store/course/course.action';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as UIAction from '../../store/ui/ui.action';
import { PAGESIZE } from 'src/app/core/config/config';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  id: number = 0;
  isOnSearchPage: boolean = false;
  query: string = '';
  // Props for handle pagination purpose
  pageArray: any[] = [1, 2, 3, 4];
  currentPage: number = 1;
  pageSize: number = PAGESIZE;
  totalPage: number = 0;
  pageNumberLimit: number = 5;
  maxPageNumberLimit: number = 5;
  minPageNumberLimit: number = 0;
  pageLength: number = 0;
  //
  private subscriptions = new Subscription();
  private subscriptionsForChangeCategory = new Subscription();
  private subscriptionsForResetPagination = new Subscription();

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Logic for creating pagination bar in client side
    this.subscriptionsForChangeCategory = this.activatedRoute.params.subscribe(
      () => {
        this.resetPagination();
      }
    );

    this.subscriptionsForResetPagination =
      this.activatedRoute.queryParams.subscribe((data) => {
        this.isOnSearchPage = !!data['query'];
        this.query = data['query'];
        if (this.isOnSearchPage) {
          this.resetPagination();
        }
      });

    this.store.select('courses').subscribe((coursesState) => {
      this.totalPage = Math.ceil(coursesState.totalRecords / this.pageSize);

      this.pageArray = [];
      for (let i = 1; i <= this.totalPage; i++) {
        this.pageArray.push(i);
      }

      this.pageLength = this.pageArray.length;
      this.pageArray = this.pageArray.filter(
        (number) =>
          number <= this.maxPageNumberLimit && number > this.minPageNumberLimit
      );
    });
  }

  onChangePage(id: number) {
    this.currentPage = id;
    this.getCoursesByPage();
  }

  onNavigatePage(type: string) {
    if (type === 'prev') {
      this.currentPage = this.currentPage - 1;

      if (this.currentPage % this.pageNumberLimit == 0) {
        this.maxPageNumberLimit =
          this.maxPageNumberLimit - this.pageNumberLimit;
        this.minPageNumberLimit =
          this.minPageNumberLimit - this.pageNumberLimit;
      }
    } else {
      this.currentPage = this.currentPage + 1;

      if (this.currentPage > this.maxPageNumberLimit) {
        this.maxPageNumberLimit =
          this.maxPageNumberLimit + this.pageNumberLimit;
        this.minPageNumberLimit =
          this.minPageNumberLimit + this.pageNumberLimit;
      }
    }

    this.getCoursesByPage();
  }

  onGoFirstPage() {
    this.currentPage = 1;
    this.maxPageNumberLimit = 5;
    this.minPageNumberLimit = 0;
    this.getCoursesByPage();
  }

  getCoursesByPage() {
    // When we in search page
    if (this.isOnSearchPage) {
      this.store.dispatch(
        new CourseActions.SearchCoursesAction({
          query: this.query,
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
        })
      );
      // When we in category page
    } else {
      this.subscriptions = this.activatedRoute.url.subscribe((url) => {
        if (url[1]) {
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
  }

  resetPagination() {
    this.maxPageNumberLimit = 5;
    this.minPageNumberLimit = 0;
    this.currentPage = 1;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.subscriptionsForChangeCategory.unsubscribe();
    this.subscriptionsForResetPagination.unsubscribe();
  }
}

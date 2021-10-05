import { Component, OnInit } from '@angular/core';
import { UiServices } from './../services/ui.service';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOnEditPage: boolean = true;

  constructor(
    private uiServices: UiServices,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('products')) {
          this.isOnEditPage = false;
        } else {
          this.isOnEditPage = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((data) => {
      console.log(data);
    });
  }

  onAddNewCourse() {
    this.uiServices.openModel('new');
  }
}

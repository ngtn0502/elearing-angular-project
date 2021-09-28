import { Component, OnInit } from '@angular/core';
import { UiServices } from './../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private uiServices: UiServices) {}

  ngOnInit(): void {}

  onAddNewCourse() {
    this.uiServices.openModel('new');
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiServices {
  isModelOpen: boolean = false;
  modelType: string = '';
  constructor() {}

  modelId = new Subject<number>();

  modelChange = new Subject<boolean>();

  openModel(type: string) {
    this.isModelOpen = true;
    this.modelType = type;
    this.modelChange.next();
  }

  closeModel() {
    this.isModelOpen = false;
    this.modelChange.next();
  }
}

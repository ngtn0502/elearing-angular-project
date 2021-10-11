import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigngupPageComponent } from './signgup-page.component';

describe('SigngupPageComponent', () => {
  let component: SigngupPageComponent;
  let fixture: ComponentFixture<SigngupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigngupPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigngupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

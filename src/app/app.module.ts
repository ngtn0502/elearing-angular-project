import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffect } from './store/course/course.effect';
import { CategoryEffect } from './store/category/category.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CoursesComponent } from './components/courses/courses.component';
import { HeaderComponent } from './components/header/header.component';
import { CourseComponent } from './components/courses/course/course.component';
import { ModalDetailComponent } from './components/modal-detail/modal-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseDetailComponent } from './page/course-detail-page/course-detail.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { HomepageComponent } from './page/home-page/homepage.component';
import { SearchpageComponent } from './page/search-page/searchpage.component';
import { PaginationComponent } from './components/pagination/pagination.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'course/search', component: CoursesComponent },
  { path: 'course/page', component: HomepageComponent },
  { path: 'category/:id', component: HomepageComponent },
  { path: 'products/:id', component: CourseDetailComponent },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HeaderComponent,
    CourseComponent,
    ModalDetailComponent,
    CategoryComponent,
    FooterComponent,
    CourseDetailComponent,
    LoginPageComponent,
    ModalComponent,
    ToastComponent,
    HomepageComponent,
    SearchpageComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(AppReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: false, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([CourseEffect, CategoryEffect]),
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

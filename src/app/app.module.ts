import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { HeaderComponent } from './header/header.component';
import { CourseComponent } from './courses/course/course.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CourseDetailComponent } from './course-detail-page/course-detail.component';
import { LoginPageComponent } from './login-page/login-page.component';

const appRoutes: Routes = [
  { path: '', component: CoursesComponent, pathMatch: 'full' },
  { path: 'course', component: CoursesComponent },
  { path: 'category/:id', component: CoursesComponent },
  { path: 'products/:id', component: CourseDetailComponent },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HeaderComponent,
    CourseComponent,
    ModelDetailComponent,
    CategoryComponent,
    FooterComponent,
    CourseDetailComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

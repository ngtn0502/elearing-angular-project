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
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffect } from './store/course/course.effect';
import { CategoryEffect } from './store/category/category.effect';
import { ModalComponent } from './modal/modal.component';
import { ToastComponent } from './toast/toast.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

const appRoutes: Routes = [
  { path: '', component: CoursesComponent, pathMatch: 'full' },
  { path: 'course/search', component: CoursesComponent },
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
    ModalComponent,
    ToastComponent,
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

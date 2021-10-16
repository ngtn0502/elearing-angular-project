import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { HomepageComponent } from './page/home-page/homepage.component';
import { SearchpageComponent } from './page/search-page/searchpage.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CourseDetailPageComponent } from './page/course-detail-page/course-detail-page.component';
import { SigngupPageComponent } from './page/signgup-page/signgup-page.component';
import { AuthInterceptorService } from './core/auth/auth-interceptor.service';
import { AuthGuard, TokenGuard } from './core/auth/auth.guard';
import { AuthEffect } from './store/auth/auth.effect';
import { AddPageComponent } from './page/add-page/add-page.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'category/0', pathMatch: 'full' },
  {
    path: 'course/search',
    component: SearchpageComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'course/page',
    component: HomepageComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'category/:id',
    component: HomepageComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'products/:id',
    component: CourseDetailPageComponent,
    canActivate: [TokenGuard],
  },
  { path: 'new', component: AddPageComponent, canActivate: [TokenGuard] },
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SigngupPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundPageComponent },
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
    LoadingComponent,
    CourseDetailPageComponent,
    SigngupPageComponent,
    AddPageComponent,
    NotFoundPageComponent,
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
    EffectsModule.forRoot([CourseEffect, CategoryEffect, AuthEffect]),
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

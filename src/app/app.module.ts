import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CoursesComponent } from './shared/components/courses/courses.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { CourseComponent } from './shared/components/courses/course/course.component';
import { ModalDetailComponent } from './shared/components/modal-detail/modal-detail.component';
import { CategoryComponent } from './shared/components/category/category.component';
import { FooterComponent } from './modules/layout/footer/footer.component';
import { CourseDetailComponent } from './shared/components/course-detail/course-detail.component';
import { LoginPageComponent } from './modules/layout/page/login-page/login-page.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { HomepageComponent } from './modules/layout/page/home-page/homepage.component';
import { SearchpageComponent } from './modules/layout/page/search-page/searchpage.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { CourseDetailPageComponent } from './modules/layout/page/course-detail-page/course-detail-page.component';
import { SigngupPageComponent } from './modules/layout/page/signgup-page/signgup-page.component';
import { AddPageComponent } from './modules/layout/page/add-page/add-page.component';
import { NotFoundPageComponent } from './modules/layout/page/not-found-page/not-found-page.component';
import { AuthGuard, TokenGuard } from './services/auth/auth.guard';
import { AppReducer } from './shared/store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './shared/store/auth/auth.effect';
import { CourseEffect } from './shared/store/course/course.effect';
import { CategoryEffect } from './shared/store/category/category.effect';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { environment } from 'src/environments/environment';

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

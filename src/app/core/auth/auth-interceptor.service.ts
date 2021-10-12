import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DataStorageService } from '../services/data-storage.service';
import { getUserData } from '../shared/functions/helpers';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private dataStorageService: DataStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let modifiedRequest = req;

    if (getUserData()) {
      modifiedRequest = req.clone({
        headers: req.headers.append(
          'Authorization',
          `Bearer ${getUserData().accessToken}`
        ),
      });
    }

    return next.handle(modifiedRequest);
  }
}

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getUserData } from 'src/app/shared/functions/helpers';
import { DataStorageService } from '../../services/data-storage.service';

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

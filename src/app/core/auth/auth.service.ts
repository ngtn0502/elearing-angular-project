import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { authBaseURL } from '../config/config';
import { removeAllWhitespace } from '../shared/functions/helpers';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserData } from 'src/app/core/shared/userData.model';

interface AuthResponseData {
  username: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(username: string, password: string) {
    const trimmedUsername = removeAllWhitespace(username);
    const trimmedPassword = removeAllWhitespace(password);

    return this.http
      .post<AuthResponseData>(`${authBaseURL}/register`, {
        Username: trimmedUsername,
        Password: trimmedPassword,
      })
      .pipe(catchError((errorData) => this.errorHandler(errorData)));
  }

  login(username: string, password: string) {
    const trimmedUsername = removeAllWhitespace(username);
    const trimmedPassword = removeAllWhitespace(password);

    return this.http
      .post<AuthResponseData>(`${authBaseURL}/login`, {
        username: trimmedUsername,
        password: trimmedPassword,
      })
      .pipe(
        map((responseData) => {
          return new UserData(responseData.username, responseData.token);
        }),
        catchError((errorData) => this.errorHandler(errorData))
      );
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error) {
      return throwError(errorMessage);
    }
    return throwError(errorResponse.error);
  }
}

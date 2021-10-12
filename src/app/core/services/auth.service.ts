import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authApiURL } from '../config/config';
import { removeAllWhitespace } from '../shared/functions/helpers';

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

    return this.http.post<AuthResponseData>(`${authApiURL}/register`, {
      Username: trimmedUsername,
      Password: trimmedPassword,
    });
  }

  login(username: string, password: string) {
    const trimmedUsername = removeAllWhitespace(username);
    const trimmedPassword = removeAllWhitespace(password);

    return this.http.post<AuthResponseData>(`${authApiURL}/login`, {
      username: trimmedUsername,
      password: trimmedPassword,
    });
  }
}
